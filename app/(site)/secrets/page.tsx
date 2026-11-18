import type { Metadata } from "next";
import { SecretsList } from "@/components/secrets-list";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SecretsPage() {
  return <SecretsList />;
}
