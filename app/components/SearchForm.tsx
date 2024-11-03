"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const searchSchema = z.object({
  query: z.string().min(1, "Digite um termo para pesquisar"),
  searchType: z.enum(["cnpj", "razaoSocial", "cnae"]),
});

interface SearchFormProps {
  onSearch: (data: z.infer<typeof searchSchema>) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
      searchType: "cnpj",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="searchType"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/4">
                <FormLabel>Tipo de Busca</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cnpj">CNPJ</SelectItem>
                    <SelectItem value="razaoSocial">Razão Social</SelectItem>
                    <SelectItem value="cnae">CNAE</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full md:w-3/4">
                <FormLabel>Termo de Busca</FormLabel>
                <FormControl>
                  <Input placeholder="Digite sua busca..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          <Search className="mr-2 h-4 w-4" /> Pesquisar
        </Button>
      </form>
    </Form>
  );
}