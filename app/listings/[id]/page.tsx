import PropertyDetailPage from '@/app/properties/[slug]/page';
import { getProperties } from '@/lib/crm';

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({
    id: p.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingPage({ params }: PageProps) {
  const { id } = await params;
  return PropertyDetailPage({ params: Promise.resolve({ slug: id }) });
}
