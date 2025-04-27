import { NavigationMenu } from "@/components/navigation-menu";
import career from "@/data/career.json";
import Image from "next/image";

type Project = {
  name: string;
  description: string;
  link?: string;
  role?: string;
  contributions?: string[];
};

type Career = {
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
};

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
            <div className="grid gap-8">
              {careerData.map((career, index) => (
                <div 
                  key={career.id} 
                  className="group relative rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                >
                  <div className="flex flex-col space-y-6 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                    <div className="flex-shrink-0">
                      <div className="relative h-32 w-32 overflow-hidden rounded-full border-[1.5px] border-gray-200 bg-white transition-transform group-hover:scale-105">
                        <Image
                          src={`/images/${career.logo.src.replace('images/', '')}`}
                          alt={career.logo.alt}
                          fill
                          unoptimized
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold">{career.position}</h2>
                        <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                          <span className="text-sm font-medium text-muted-foreground">{career.company}</span>
                          <span className="hidden sm:inline text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{career.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors group-hover:bg-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">주요 프로젝트</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {career.projects.map((project, projectIndex) => (
                            <div 
                              key={projectIndex} 
                              className="space-y-3 rounded-lg border bg-muted/50 p-4 transition-all hover:bg-muted/70"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium sm:text-base">{project.name}</h4>
                                {project.link && (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline sm:text-sm"
                                  >
                                    앱 보기
                                  </a>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground sm:text-sm">
                                {project.description}
                              </p>
                              {project.role && (
                                <div className="space-y-1">
                                  <p className="text-xs font-medium text-primary sm:text-sm">담당 역할</p>
                                  <p className="text-xs text-muted-foreground sm:text-sm">{project.role}</p>
                                </div>
                              )}
                              {project.contributions && project.contributions.length > 0 && (
                                <div className="space-y-1">
                                  <p className="text-xs font-medium text-primary sm:text-sm">주요 기여</p>
                                  <ul className="list-disc pl-4 space-y-1">
                                    {project.contributions.map((contribution, idx) => (
                                      <li key={idx} className="text-xs text-muted-foreground sm:text-sm">
                                        {contribution}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
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