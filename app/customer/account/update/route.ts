import { NextRequest, NextResponse } from 'next/server';
import { updateCustomerInfo } from '@/app/repository/customerRepository';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  const session = await auth();

  console.log('Session:', session);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, cpf, phone, age } = body;

  try {
    const updated = await updateCustomerInfo(session.user.email, {
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
