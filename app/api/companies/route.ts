import { NextResponse } from 'next/server';
import type { Company } from '@/app/types/company';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const type = searchParams.get('type');
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }
  // Mock data that matches the search query
  const mockCompanies: Company[] = query === '12345678000199' ? [
    {
      cnpj: "12345678000199",
      razaoSocial: "Empresa Exemplo LTDA",
      nomeFantasia: "Exemplo Comercio",
      cnae: {
        codigo: "4751201",
        descricao: "Comércio varejista especializado de equipamentos e suprimentos de informática"
      },
      endereco: {
        estado: "SP",
        cidade: "São Paulo"
      }
    }
  ] : [];
  return NextResponse.json(mockCompanies);
}