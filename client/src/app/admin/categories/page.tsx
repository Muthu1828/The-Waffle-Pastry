'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, ListChecks, Hash, Upload, X } from 'lucide-react'
import API from '../../../lib/api'
import { toast } from 'react-hot-toast'

const CategoryPage = () => {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newCategory, setNewCategory] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const [creating, setCreating] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories')
      setCategories(data)
    } catch (err) {
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    setUploading(true)
    try {
      const { data } = await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setCategoryImage(data.url)
      toast.success('Category icon uploaded!')
    } catch (err) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    setCreating(true)
    try {
      await API.post('/categories', { 
        name: newCategory,
        image: categoryImage 
      })
      setNewCategory('')
      setCategoryImage('')
      fetchCategories()
      toast.success('Category added!')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add category')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure? This will not delete products, but they will lose this category.')) return
    
    try {
      await API.delete(`/categories/${id}`)
      setCategories(categories.filter(c => c._id !== id))
      toast.success('Category removed')
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
         <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
            <ListChecks size={24} />
         </div>
         <div>
            <h1 className="font-heading text-4xl font-bold text-secondary">Manage Categories</h1>
            <p className="text-secondary/50">Upload custom images for your category displays.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Add New Category */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-primary/10 shadow-sm h-fit">
           <h2 className="font-bold text-lg text-secondary mb-6 flex items-center gap-2">
              <Plus size={18} className="text-accent" /> Add New Category
           </h2>
           <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-secondary/40 uppercase tracking-widest ml-1">Display Image</label>
                 <div className="relative h-40 bg-background rounded-3xl border-2 border-dashed border-primary/10 flex flex-col items-center justify-center overflow-hidden group">
                    {categoryImage ? (
                      <>
                        <img src={categoryImage} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setCategoryImage('')}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} className="text-red-500" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        {uploading ? <Loader2 className="animate-spin text-accent mx-auto" /> : <Upload className="text-secondary/20 mx-auto mb-2" />}
                        <p className="text-[10px] font-bold text-secondary/30 uppercase tracking-widest">Icon / Image</p>
                      </div>
                    )}
                    <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                 </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-secondary/40 uppercase tracking-widest mb-2 ml-1">Category Name</label>
                 <input 
                    type="text" 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. French Fries"
                    className="w-full px-6 py-4 bg-background rounded-2xl border-none outline-none focus:ring-2 ring-accent/20 transition-all font-medium"
                 />
              </div>

              <button 
                 type="submit"
                 disabled={creating || !newCategory}
                 className="w-full btn-primary flex items-center justify-center gap-2"
              >
                 {creating ? <Loader2 className="animate-spin" size={18} /> : 'Create Category'}
              </button>
           </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
           <h2 className="font-bold text-lg text-secondary mb-6 flex items-center gap-2 ml-4">
              <Hash size={18} className="text-accent" /> Existing Categories
           </h2>
           {loading ? (
              <div className="flex justify-center py-12">
                 <Loader2 className="animate-spin text-accent" size={32} />
              </div>
           ) : categories.length === 0 ? (
              <p className="text-center text-secondary/40 italic py-12">No categories yet.</p>
           ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map(cat => (
                  <div key={cat._id} className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] border border-primary/5 shadow-sm group hover:border-accent/30 transition-all">
                     <div className="w-16 h-16 rounded-xl bg-background overflow-hidden border border-primary/5">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-secondary/10">N/A</div>
                        )}
                     </div>
                     <div className="flex-1">
                        <span className="font-bold text-secondary block">{cat.name}</span>
                        <span className="text-[10px] text-secondary/30 uppercase font-bold tracking-widest">{cat.slug}</span>
                     </div>
                     <button 
                        onClick={() => handleDelete(cat._id)}
                        className="p-3 text-secondary/10 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                     >
                        <Trash2 size={18} />
                     </button>
                  </div>
                ))}
              </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
