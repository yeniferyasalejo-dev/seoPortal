"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewClientPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState("active");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name") as string,
      domain: formData.get("domain") as string,
      clientName: formData.get("clientName") as string,
      clientEmail: formData.get("clientEmail") as string,
      status,
      startDate: formData.get("startDate") as string,
      ga4PropertyId: formData.get("ga4") as string,
      gscSiteUrl: formData.get("gsc") as string,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear el cliente");
        setLoading(false);
        return;
      }

      setSuccess(
        `Cliente creado exitosamente. Password temporal: ${data.tempPassword}`
      );
      setLoading(false);
    } catch {
      setError("Error de conexion. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/clients">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">Nuevo Cliente</h1>
      </div>

      <Card className="bg-card border-border max-w-2xl">
        <CardHeader>
          <CardTitle className="text-foreground">Informacion del proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del proyecto</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej: Mi Empresa"
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Dominio</Label>
                <Input
                  id="domain"
                  name="domain"
                  placeholder="Ej: miempresa.com"
                  required
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nombre del cliente</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  placeholder="Nombre completo"
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email del cliente</Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  placeholder="cliente@email.com"
                  required
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={status} onValueChange={(v) => setStatus(v ?? "active")}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="paused">Pausado</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha de inicio</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ga4">GA4 Property ID (opcional)</Label>
              <Input
                id="ga4"
                name="ga4"
                placeholder="Ej: 123456789"
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gsc">Google Search Console URL (opcional)</Label>
              <Input
                id="gsc"
                name="gsc"
                placeholder="Ej: https://miempresa.com"
                className="bg-secondary border-border"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {success && (
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-3">
                <p className="text-sm text-primary font-medium">{success}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Link href="/admin/clients">
                <Button variant="outline" className="border-border text-muted-foreground">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading || !!success}
              >
                {loading ? "Creando..." : "Crear cliente"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
