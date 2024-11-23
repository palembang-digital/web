"use client";

import { insertJobSchema } from "@/db/schema";
import { useState } from "react";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";

export default function JobForm({
  job,
  onSubmit,
}: {
  job: any;
  onSubmit: (data: any) => void;
}) {
  const [values, setValues] = useState(job);

  return (
    <AutoForm
      values={values}
      formSchema={insertJobSchema}
      onSubmit={async (data) => {
        const requestData = {
          job: data,
        };

        await onSubmit(requestData);
      }}
      fieldConfig={{
        title: {
          label: "Judul loker",
        },
        company: {
          label: "Perusahaan",
        },
        location: {
          label: "Lokasi",
          description:
            "Lokasi tempat kerja. Contoh: Palembang, Sumatera Selatan, Indonesia",
        },
        workplaceType: {
          label: "Tipe tempat kerja",
        },
        jobType: {
          label: "Tipe pekerjaan",
        },
        description: {
          label: "Deskripsi",
          fieldType: "richtextarea",
        },
        salary: {
          label: "Gaji",
          description:
            "Opsional. Gaji atau range gaji yang ditawarkan. Contoh: Rp 5.000.000 atau Rp 5.000.000 - Rp 10.000.000",
        },
      }}
    >
      <AutoFormSubmit>Simpan</AutoFormSubmit>
    </AutoForm>
  );
}
