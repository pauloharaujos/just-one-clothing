'use client';

import Image from 'next/image';
import { useState } from 'react';

type User = {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  cpf?: string | null;
  phone?: string | null;
  age?: number | null;
};

interface CustomerInfoProps {
  user: User;
}


export default function CustomerInfo({ user }: CustomerInfoProps) {

  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      cpf: formData.get('cpf'),
      phone: formData.get('phone'),
      age: formData.get('age'),
    };

    const res = await fetch('/customer/account/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) setSuccess(true);
  }

  return (
    <form className="mx-auto bg-white rounded-xl shadow p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">My Account</h1>
      <div className="flex items-center gap-4 mb-6">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || user.email}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
            unoptimized
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-400">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="#A3A3A3" strokeWidth="2" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.015-8 4.5V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-2.485-3.582-4.5-8-4.5Z"/></svg>
          </div>
        )}
        <div>
          <div className="text-lg font-semibold text-indigo-900">{user.name || ''}</div>
          <div className="text-base text-indigo-700">{user.email}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Name</label>
          <input name="name" defaultValue={user.name || ''} className="w-full rounded-md border border-indigo-200 px-3 py-2 text-indigo-900 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Email</label>
          <input name="email" defaultValue={user.email || ''} className="w-full rounded-md border border-indigo-200 px-3 py-2 text-indigo-900 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">CPF</label>
          <input name="cpf" defaultValue={user.cpf || ''} placeholder="" className="w-full rounded-md border border-indigo-200 px-3 py-2 text-indigo-900 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Phone</label>
          <input name="phone" defaultValue={user.phone || ''} placeholder="" className="w-full rounded-md border border-indigo-200 px-3 py-2 text-indigo-900 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Age</label>
          <input name="age" defaultValue={user.age ?? ''} placeholder="" className="w-full rounded-md border border-indigo-200 px-3 py-2 text-indigo-900 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button type="submit" className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow">Save Changes</button>
      </div>
      {success && <div className="text-green-600 font-medium mt-2">Account updated successfully!</div>}
    </form>
  );
}
