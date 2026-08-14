/**
 * Pathfinder Editorial finance hub: one strong category proposition, a visible service spine,
 * and enough depth for search without turning the page into an undifferentiated card wall.
 */

import { Link, useParams } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PagePrimitives";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { ArrowLink, FinalCta, SectionIntro } from "@/components/Shared";
import { SiteLayout } from "@/components/SiteChrome";
import NotFound from "@/pages/NotFound";
import { getCategory, services } from "@/lib/siteData";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = getCategory(params.category);
  if (!category) return <NotFound />;
  const categoryServices = services.filter((service) => service.category === category.id);

  return (
    <SiteLayout>
      <Seo
        description={category.description}
        image={category.image}
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: category.title, path: category.path }])}
        path={category.path}
        title={`${category.title} Finance | Next Move Loans`}
      />
      <main id="main-content">
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Finance", href: "/#finance" }, { label: category.title }]}
          challenge={category.challenge}
          eyebrow={category.eyebrow}
          image={category.image}
          intro={<p>{category.description}</p>}
          title={category.title}
        >
          <Link className="button button-coral" href="/plan-your-next-move">
            Plan Your Next Move<ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </PageHero>

        <section className="section-space bg-white">
          <div className="container">
            <SectionIntro
              body={<p>Choose the situation closest to the move in front of you. The first conversation can still begin before you know exactly which service fits.</p>}
              eyebrow="PATHWAYS, NOT PRODUCT SHELVES"
              index="01"
              title={<>Where does the <em>current move</em> begin?</>}
            />
            <div className="service-list-spine">
              {categoryServices.map((service, index) => (
                <Link className="service-list-row group" href={`/services/${service.slug}`} key={service.slug}>
                  <span className="service-list-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{service.title}</h2>
                    <p>{service.short}</p>
                  </div>
                  <span className="service-list-action">
                    Explore<ArrowUpRight aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="category-question-band">
          <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span>THE BETTER STARTING POINT</span>
              <h2>Not sure which service fits? Good. Start with the decision.</h2>
              <p>Tell us what you are trying to build, what may be standing in the way and when the move needs to happen.</p>
            </div>
            <ArrowLink href="/plan-your-next-move" light>Plan Your Next Move</ArrowLink>
          </div>
        </section>

        <FinalCta />
      </main>
    </SiteLayout>
  );
}

