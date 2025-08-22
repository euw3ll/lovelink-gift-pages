// src/components/ui/ThemeForm.tsx

import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { themeRegistry, ThemeType, ThemeField } from "@/lib/themes";
import { ThemeData } from "@/components/ui/theme-templates/types";
import { toast } from "@/components/ui/sonner"; // CORREÇÃO AQUI

interface ThemeFormProps {
  theme: ThemeType;
  initialData?: Partial<ThemeData>;
  onSubmit: (data: ThemeData) => void;
}

const DynamicFormField = ({
  field,
  control,
  fieldName,
}: {
  field: ThemeField;
  control: Control<Record<string, unknown>>;
  fieldName: string;
}) => {
  const placeholder = field.placeholder || `Insira a URL aqui...`;

  switch (field.type) {
    case "textarea":
      return (
        <Controller
          name={fieldName}
          control={control}
          render={({ field: controllerField }) => (
            <Textarea
              {...controllerField}
              value={controllerField.value || ""}
              placeholder={field.placeholder}
            />
          )}
        />
      );
    case "date":
      return (
        <Controller
          name={fieldName}
          control={control}
          render={({ field: controllerField }) => (
            <Input
              type="date"
              {...controllerField}
              value={controllerField.value || ""}
            />
          )}
        />
      );
    case "image_url":
    case "video_url":
    case "text":
    default:
      return (
        <Controller
          name={fieldName}
          control={control}
          render={({ field: controllerField }) => (
            <Input
              {...controllerField}
              value={controllerField.value || ""}
              placeholder={placeholder}
            />
          )}
        />
      );
  }
};

const ThemeForm = ({ theme, initialData, onSubmit }: ThemeFormProps) => {
  const themeConfig = themeRegistry[theme];

  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialData || themeConfig.getDefaultData(),
  });

  useEffect(() => {
    reset(initialData || themeConfig.getDefaultData());
  }, [theme, initialData, reset]);

  // Acessa o field list (se existir) para o useFieldArray.
  const fieldListConfig = themeConfig.fieldLists
    ? themeConfig.fieldLists[0]
    : null;

  const { fields } = useFieldArray<ThemeData>({
    control,
    // Garante que só vamos usar o useFieldArray se houver um fieldList definido
    name: fieldListConfig ? (fieldListConfig.id as keyof ThemeData) : "dummy",
  });

  const onFormSubmit = (data: ThemeData) => {
    onSubmit(data);
    toast.success("Página salva com sucesso!", {
      description: "Suas alterações foram guardadas.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {themeConfig.fields?.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <DynamicFormField
                  field={field}
                  control={control}
                  fieldName={field.id}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {fieldListConfig && (
        <Card>
          <CardHeader>
            <CardTitle>
              {fieldListConfig.title}s ({fieldListConfig.limit})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {fields.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={item.id}>
                  <AccordionTrigger>
                    {fieldListConfig.title} #{index + 1}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 p-2">
                    {fieldListConfig.fields.map((field) => (
                      <div key={field.id}>
                        <Label>{field.label}</Label>
                        <DynamicFormField
                          field={field}
                          control={control}
                          fieldName={`${fieldListConfig.id}.${index}.${field.id}`}
                        />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-[var(--shadow-love)]"
      >
        Salvar Alterações
      </Button>
    </form>
  );
};

export default ThemeForm;
