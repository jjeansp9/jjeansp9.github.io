import { NavigationMenu } from "@/components/navigation-menu";
import career from "@/data/career.json";
import Image from "next/image";

interface Project {
  name: string;
  description: string;
  link?: string;
}

interface Career {
  id: string;
  position: string;
  company: string;
  logo: {
    src: string;
    alt: string;
  };
  duration: string;
  skills: string[];
  projects: Project[];
}

const careerData = career.career as Career[];

export default function CareerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationMenu />
      <main className="flex-1">
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-[800px] space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Career
              </h1>
              <p className="text-lg text-muted-foreground">
                제 경력을 소개합니다.
              </p>
            </div>
            <div className="space-y-8">
              {careerData.map((career, index) => (
                <div key={career.id} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                    <div className="flex-shrink-0">
                      <div className="relative h-32 w-32 overflow-hidden rounded-full border-[1.5px] border-gray-200 bg-white">
                        <Image
                          src={`/images/${career.logo.src.replace('images/', '')}`}
                          alt={career.logo.alt}
                          fill
                          unoptimized
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold">{career.position}</h2>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{career.company}</span>
                          <span>•</span>
                          <span>{career.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">주요 프로젝트</h3>
                        {career.projects.map((project, projectIndex) => (
                          <div key={projectIndex} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{project.name}</h4>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  앱 보기
                                </a>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {project.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 