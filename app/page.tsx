"use client";

import { useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { CompanyTable } from "./components/CompanyTable";
import { Filters } from "./components/Filters";
import { Company, SearchParams } from "./types/company";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ShieldCheck } from "lucide-react";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (searchData: { query: string; searchType: string }) => {
    setLoading(true);
    try {
      // In a real application, this would be an API call to your backend
      const response = await fetch(`/api/companies?query=${searchData.query}&type=${searchData.searchType}`);
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      toast({
        title: "Erro na busca",
        description: "Não foi possível realizar a busca. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: { estado?: string; cidade?: string }) => {
    // In a real application, this would trigger a new API call with the filters
    console.log("Applying filters:", filters);
  };

  // In a real application, these would come from the API
  const estados = ["SP", "RJ", "MG", "RS", "PR"];
  const cidades = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Porto Alegre", "Curitiba"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Consulta CNPJ
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Pesquise informações detalhadas sobre empresas brasileiras
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pesquisar Empresas</CardTitle>
              <CardDescription>
                Busque por CNPJ, Razão Social ou CNAE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SearchForm onSearch={handleSearch} />
            </CardContent>
          </Card>

          {companies.length > 0 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Filtros</CardTitle>
                  <CardDescription>
                    Refine sua busca por localização
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Filters
                    estados={estados}
                    cidades={cidades}
                    onFilterChange={handleFilterChange}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resultados da Pesquisa</CardTitle>
                  <CardDescription>
                    {companies.length} empresas encontradas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyTable data={companies} />
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <div>
                <CardTitle>Conformidade LGPD</CardTitle>
                <CardDescription>
                  Seus dados estão protegidos de acordo com a Lei Geral de Proteção de Dados
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Este serviço está em conformidade com a LGPD (Lei nº 13.709/2018).
                Os dados consultados são de natureza pública e utilizados apenas
                para fins de consulta empresarial.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}