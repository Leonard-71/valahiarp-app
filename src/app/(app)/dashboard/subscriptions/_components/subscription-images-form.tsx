"use client";

import { useRef, useState } from "react";

import { toast } from "sonner";

import { FormBuilder } from "@/components/custom/form-builder/form-builder";
import {
  ImageGallery,
  ImageItem,
} from "@/components/custom/image-gallery/image-gallery";
import { Button } from "@/components/ui/button";
import {
  createDocument,
  createDocumentSignedUrl,
  removeDocument,
} from "@/controller/admin";
import { calculateChecksum } from "@/lib/calculate-checksum";
import { SingleSubscriptionResponseDto } from "@/types";
import {
  DocumentFolderInput,
  DocumentMimeTypeInput,
  DocumentRelations,
} from "@/types/documents";

import {
  imageFormConfig,
  imageFormSchema,
} from "../_utils/subscription-images-form.config";

interface SubscriptionImagesFormProps {
  subscription: SingleSubscriptionResponseDto;
}

export function SubscriptionImagesForm({
  subscription,
}: SubscriptionImagesFormProps) {
  const [documents, setDocuments] = useState<ImageItem[]>(
    subscription ? subscription.documents : [],
  );
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const formRef = useRef<{ submit: () => Promise<any>; reset: () => void }>(
    null,
  );

  const handleAddImage = async (values: any) => {
    const { files } = values;

    const uploadPromises = files.map(async (file: File) => {
      try {
        const checkSum = await calculateChecksum(file);

        const createResponse = await createDocument({
          folder: DocumentFolderInput.IMAGES,
          fileName: file.name,
          fileType: file.type as DocumentMimeTypeInput,
          fileSize: file.size,
          checkSum,
          relations: [
            {
              entityType: DocumentRelations.SUBSCRIPTION,
              ids: [subscription.id],
            },
          ],
        });

        if (createResponse.error) {
          throw new Error(createResponse.error.message);
        }

        const uploadResponse = await fetch(createResponse.data.signedUrl, {
          method: "PUT",
          body: file,
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          throw new Error(`Încărcarea a eșuat: ${errorText}`);
        }

        const signedUrlResponse = await createDocumentSignedUrl(
          createResponse.data.document.key,
        );

        if (signedUrlResponse.error) {
          throw new Error("Nu s-a putut obține URL-ul pentru imagine.");
        }

        return {
          key: createResponse.data.document.key,
          name: createResponse.data.document.name,
          url: signedUrlResponse.data.signedUrl,
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "A apărut o eroare.";
        toast.error(`Eroare la încărcarea fișierului ${file.name}: ${message}`);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const newDocuments = results.filter((doc) => doc !== null) as ImageItem[];

    if (newDocuments.length > 0) {
      setDocuments((prevDocs) => [...newDocuments, ...prevDocs]);
      toast.success(
        `${newDocuments.length} imagine(i) au fost adăugate cu succes.`,
      );

      // Reset form after successful upload
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const handleDeleteImage = async (key: string) => {
    setIsDeleting(key);
    const response = await removeDocument(key);
    setIsDeleting(null);

    if (response.error) {
      toast.error(response.error.message);
    } else {
      toast.success("Imaginea a fost ștearsă cu succes.");
      setDocuments(documents.filter((doc) => doc.key !== key));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <FormBuilder
        ref={formRef}
        config={imageFormConfig}
        schema={imageFormSchema}
        onSubmit={handleAddImage}
        className="flex items-center gap-4 p-0 shadow-none"
        submitButton={({ isSubmitting }) => (
          <Button type="submit" isLoading={isSubmitting}>
            Adaugă imagini
          </Button>
        )}
        showErrorMessages={false}
      />

      <ImageGallery
        className="h-96"
        images={documents}
        onDelete={handleDeleteImage}
        isDeleting={isDeleting}
      />
    </div>
  );
}
