import { Footer } from '../components/layout/Footer';
import { ContactCta } from '../components/portfolio/ContactCta';
import { ProjectShowcase } from '../components/portfolio/ProjectShowcase';
import { Eyebrow } from '../components/ui/Eyebrow';
import { clientProjects } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PAGE_HEADING } from '../lib/type';

export function PortfolioPage() {
  useDocumentTitle('Portfolio · Alexander Tjernström');

  return (
    // Pulled up under the navbar, like the About page.
    <div
      style={{
        marginTop: 'calc(var(--nav-h, 72px) * -1)',
        paddingTop: 'var(--nav-h, 72px)',
      }}
      className="relative isolate overflow-clip px-4 sm:px-8 lg:px-12"
    >
      <section className="py-14">
        <div className="mb-12 flex flex-col gap-5 sm:mb-16">
          <div>
            <Eyebrow className="mb-4">Recent client work</Eyebrow>
            <h1 className={PAGE_HEADING}>Portfolio.</h1>
          </div>
          <p className="max-w-[52ch] text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Sites I have built for real clients, live and in use.
          </p>
        </div>
        <ProjectShowcase projects={clientProjects} />
      </section>
      <ContactCta />
      <Footer />
    </div>
  );
}
