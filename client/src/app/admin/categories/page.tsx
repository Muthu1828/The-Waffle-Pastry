'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2, ListChecks, Hash } from 'lucide-react'
import API from '../../../lib/api'
import { toast } from 'react-hot-toast'

const CategoryPage = () => {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newCategory, setNewCategory] = useState('')
  const [creating, setCreating] = useState(false)

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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    setCreating(true)
    try {
      await API.post('/categories', { name: newCategory })
      setNewCategory('')
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
         <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
            <ListChecks size={24} />
         </div>
         <div>
            <h1 className="font-heading text-4xl font-bold text-secondary">Manage Categories</h1>
            <p className="text-secondary/50">Add or remove product groups like Fries, Shakes, etc.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Add New Category */}
        <div className="bg-white p-8 rounded-[2rem] border border-primary/10 shadow-sm">
           <h2 className="font-bold text-lg text-secondary mb-6 flex items-center gap-2">
              <Plus size={18} className="text-accent" /> Add New
           </h2>
           <form onSubmit={handleCreate} className="space-y-4">
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
        <div className="space-y-4">
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
              categories.map(cat => (
                <div key={cat._id} className="flex justify-between items-center bg-white px-8 py-5 rounded-[1.5rem] border border-primary/5 shadow-sm group hover:border-accent/30 transition-all">
                   <span className="font-bold text-secondary">{cat.name}</span>
                   <button 
                      onClick={() => handleDelete(cat._id)}
                      className="p-3 text-secondary/10 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                   >
                      <Trash2 size={18} />
                   </button>
                </div>
              ))
           )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
