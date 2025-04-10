import { NavigationMenu } from "@/components/navigation-menu";
import { ProjectCard } from "@/components/project-card";
import projects from "@/data/projects.json";

export default function ProjectsPage() {

  return (
    <div className="flex min-h-screen flex-col">
      <NavigationMenu />
      <main className="flex-1">
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-[1200px] space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                프로젝트
              </h1>
              <p className="text-lg text-muted-foreground">
                제가 개발한 안드로이드 앱 프로젝트들을 소개합니다.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  period={project.period}
                  summary={project.summary}
                  techStack={project.tech_stack}
                  images={project.img_list}
                  imgLogo={project.img_logo}
                  img={project.img}
                  url={project.playstore_url}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 