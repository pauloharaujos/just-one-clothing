import { NextRequest, NextResponse } from 'next/server';
import { updateCustomerInfo } from '@/repository/customerRepository';
import { getCustomerFromSession } from '@/lib/utils';

export async function POST(request: NextRequest) {
  const customer = await getCustomerFromSession();
  
  if (!customer?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, cpf, phone, age } = body;

  try {
    const updated = await updateCustomerInfo(customer.email, {
      name,
      cpf,
      phone,
      age: age ? Number(age) : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: `Failed to update account info: ${err}` }, { status: 500 });
  }
}
