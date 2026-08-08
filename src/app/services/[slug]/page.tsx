import { SiteChrome } from "@/components/site/site-chrome";
import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import { services, servicesBySlug } from "@/data/services";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesBySlug(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.name} — From ₹${service.startsFrom.toLocaleString("en-IN")}`,
    description: service.short,
  };
}

export default async function ServiceDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesBySlug(slug);
  if (!service) notFound();
  return (
    <SiteChrome>
      <ServiceDetailPage slug={slug} />
    </SiteChrome>
  );
}
