'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, Package, Loader2, Upload, X } from 'lucide-react'
import API from '../../../lib/api'
import { toast } from 'react-hot-toast'

const AdminProducts = () => {
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    countInStock: 10,
    image: ''
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories')
      setCategories(data)
      if (data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: data[0].name }))
      }
    } catch (err) {
      toast.error('Failed to load categories')
    }
  }

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products')
      setProducts(data)
    } catch (err) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formDataUpload = new FormData()
    formDataUpload.append('image', file)

    setUploading(true)
    try {
      const { data } = await API.post('/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setFormData({ ...formData, image: data.url })
      toast.success('Image uploaded successfully!')
    } catch (err) {
      toast.error('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.image) {
      toast.error('Please upload a product image first')
      return
    }

    try {
      await API.post('/products', formData)
      toast.success('Product added successfully')
      setShowModal(false)
      fetchProducts()
      setFormData({ name: '', price: '', category: categories[0]?.name || '', description: '', countInStock: 10, image: '' })
    } catch (err) {
      toast.error('Failed to add product')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`)
        toast.success('Product deleted')
        fetchProducts()
      } catch (err) {
        toast.error('Delete failed')
      }
    }
  }

  return (
    <div className="p-8 md:p-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-secondary font-heading">Products Management</h1>
            <p className="text-secondary/40 mt-1">Add, edit or delete your bakery treats.</p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} /> Add New Product
          </button>
      </header>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-primary/10 overflow-hidden">
          {loading ? (
            <div className="p-24 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-accent" size={48} />
                <p className="font-bold text-secondary/40 uppercase tracking-widest text-xs">Cooking your data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-background/50 text-secondary/40 text-xs font-bold uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-4">Product Info</th>
                        <th className="px-8 py-4">Category</th>
                        <th className="px-8 py-4">Price</th>
                        <th className="px-8 py-4">Stock</th>
                        <th className="px-8 py-4">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10 text-sm">
                      {products.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-8 py-12 text-center text-secondary/40 italic">No products found. Add your first treat!</td>
                        </tr>
                      ) : (
                        products.map((product) => (
                            <tr key={product._id} className="hover:bg-primary/5 transition-colors">
                              <td className="px-8 py-6">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl overflow-hidden flex items-center justify-center text-accent">
                                        {product.image ? (
                                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                          <Package size={20} />
                                        )}
                                    </div>
                                    <span className="font-bold text-secondary">{product.name}</span>
                                  </div>
                              </td>
                              <td className="px-8 py-6 text-secondary/70 font-medium">{product.category}</td>
                              <td className="px-8 py-6 font-bold text-secondary">Rs.{product.price}</td>
                              <td className="px-8 py-6">
                                  <span className={`font-bold ${product.countInStock < 10 ? 'text-red-500' : 'text-secondary/70'}`}>
                                    {product.countInStock} pcs
                                  </span>
                              </td>
                              <td className="px-8 py-6">
                                  <div className="flex gap-4">
                                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                  </div>
                              </td>
                            </tr>
                        ))
                      )}
                  </tbody>
                </table>
            </div>
          )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-secondary font-heading">Add New Product</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-background rounded-full transition-colors">
                  <X size={24} className="text-secondary/40" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/50 block mb-2">Product Image</label>
                    <div className="relative h-48 bg-background border-2 border-dashed border-primary/20 rounded-3xl flex flex-col items-center justify-center overflow-hidden group">
                      {formData.image ? (
                        <>
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <label className="cursor-pointer bg-white px-6 py-2 rounded-full font-bold text-secondary text-sm">Change Image</label>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-secondary/30">
                          {uploading ? <Loader2 className="animate-spin mb-2" /> : <Upload className="mb-2" />}
                          <span className="text-sm font-bold uppercase tracking-widest">Click to upload</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Product Name</label>
                    <input 
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-background/50 border border-primary/10 rounded-2xl p-4 outline-none focus:border-accent font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Price (Rs.)</label>
                    <input 
                        type="number" required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-background/50 border border-primary/10 rounded-2xl p-4 outline-none focus:border-accent font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Category</label>
                    <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-background/50 border border-primary/10 rounded-2xl p-4 outline-none focus:border-accent font-medium"
                    >
                        {categories.map(cat => (
                          <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Description</label>
                    <textarea 
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-background/50 border border-primary/10 rounded-2xl p-4 outline-none focus:border-accent min-h-[100px] font-medium" 
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-8 py-4 bg-background border border-primary/20 rounded-2xl font-bold text-secondary">Cancel</button>
                    <button type="submit" disabled={uploading} className="flex-1 btn-primary py-4 disabled:opacity-50">Save Product</button>
                  </div>
              </form>
            </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
