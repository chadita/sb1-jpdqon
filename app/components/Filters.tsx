"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon } from "lucide-react";

interface FiltersProps {
  estados: string[];
  cidades: string[];
  onFilterChange: (filters: { estado?: string; cidade?: string }) => void;
}

export function Filters({ estados, cidades, onFilterChange }: FiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="w-full md:w-1/4">
        <label className="text-sm font-medium">Estado</label>
        <Select
          onValueChange={(value) =>
            onFilterChange({ estado: value, cidade: undefined })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            {estados.map((estado) => (
              <SelectItem key={estado} value={estado}>
                {estado}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-1/4">
        <label className="text-sm font-medium">Cidade</label>
        <Select
          onValueChange={(value) => onFilterChange({ cidade: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma cidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas</SelectItem>
            {cidades.map((cidade) => (
              <SelectItem key={cidade} value={cidade}>
                {cidade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        onClick={() => onFilterChange({ estado: undefined, cidade: undefined })}
      >
        <FilterIcon className="mr-2 h-4 w-4" />
        Limpar Filtros
      </Button>
    </div>
  );
}