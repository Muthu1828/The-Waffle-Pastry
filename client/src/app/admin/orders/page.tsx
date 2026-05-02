'use client'

import React, { useState, useEffect } from 'react'
import { ShoppingBag, Loader2, Eye, CheckCircle, Package } from 'lucide-react'
import API from '../../../lib/api'
import { toast } from 'react-hot-toast'

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders')
      setOrders(data)
    } catch (err) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleDeliver = async (id: string) => {
    try {
      await API.put(`/orders/${id}/deliver`)
      fetchOrders()
      toast.success('Order marked as Delivered')
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="p-8 md:p-12">
      <div className="flex items-center gap-4 mb-12">
         <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
            <ShoppingBag size={24} />
         </div>
         <div>
            <h1 className="font-heading text-4xl font-bold text-secondary">Order Management</h1>
            <p className="text-secondary/50">Track and manage customer orders.</p>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-primary/10 shadow-sm overflow-hidden">
         {loading ? (
           <div className="p-24 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-accent" size={48} />
              <p className="text-secondary/40 font-bold uppercase tracking-widest text-xs">Fetching Orders...</p>
           </div>
         ) : orders.length === 0 ? (
           <div className="p-24 text-center">
              <Package size={48} className="text-secondary/10 mx-auto mb-4" />
              <p className="text-secondary/40 italic">No orders received yet.</p>
           </div>
         ) : (
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-background/50 text-secondary/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <tr>
                       <th className="px-8 py-6">Order ID</th>
                       <th className="px-8 py-6">Customer</th>
                       <th className="px-8 py-6">Total Price</th>
                       <th className="px-8 py-6">Status</th>
                       <th className="px-8 py-6">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-primary/5">
                    {orders.map(order => (
                      <tr key={order._id} className="hover:bg-primary/5 transition-all">
                         <td className="px-8 py-6 font-bold text-secondary text-sm">#{order._id.slice(-6)}</td>
                         <td className="px-8 py-6">
                            <p className="font-bold text-secondary text-sm">{order.user?.name || 'Guest'}</p>
                            <p className="text-xs text-secondary/40">{order.user?.email || 'N/A'}</p>
                         </td>
                         <td className="px-8 py-6 font-black text-secondary">₹{order.totalPrice}</td>
                         <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-600' : 
                              order.orderStatus === 'Processing' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                               {order.orderStatus}
                            </span>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex gap-3">
                               <button className="p-2 text-secondary/40 hover:text-accent hover:bg-accent/10 rounded-lg transition-all">
                                  <Eye size={18} />
                               </button>
                               {order.orderStatus !== 'Delivered' && (
                                 <button 
                                    onClick={() => handleDeliver(order._id)}
                                    className="p-2 text-secondary/40 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                 >
                                    <CheckCircle size={18} />
                                 </button>
                               )}
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
         )}
      </div>
    </div>
  )
}

export default OrdersPage
