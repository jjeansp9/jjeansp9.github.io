"use client";

import { useEffect, useState, useRef } from "react";
import { NavigationMenu } from "@/components/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import projects from "@/data/projects.json";
import career from "@/data/career.json";
import aboutMe from "@/data/about-me.json";
import { AnimatedSection, AnimatedCard, AnimatedText } from "@/components/animated-section";
import { ScrollIndicator } from "@/components/scroll-indicator";
import Image from "next/image";

interface Project {
  name: string;
  description: string;
  link?: string;
  dev_part: string;
  key_function: string[];
  meaning: string;
  pdf?: string;
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

interface AboutMe {
  profile: {
    image: {
      src: string;
      alt: string;
    };
    title: string;
    content: string;
  };
  profile_info: {
    [key: string]: string;
  };
  experience: {
    duration: string;
    description: string;
  }[];
}

const careerData = career.career as Career[];
const aboutMeData = aboutMe as AboutMe;

const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["Kotlin", "Java"],
  },
  {
    name: "Android Development",
    skills: [
      "Android SDK",
      "Jetpack Compose",
      "DataBinding",
      "ViewBinding",
      "Material Design",
    ],
  },
  {
    name: "Databases",
    skills: ["Room Database", "SQLite", "Firebase"],
  },
  {
    name: "Networking",
    skills: ["Retrofit2", "OkHttp", "REST API"],
  },
  {
    name: "Architecture",
    skills: ["MVVM", "Clean Architecture"],
  },
  {
    name: "Others",
    skills: ["Git", "GitHub", "Android Studio", "Visual Studio Code", "Cursor AI"],
  },
];

const careerItems = [
  {
    title: "안드로이드 앱 개발자",
    company: "ABC Tech",
    period: "2022 - 현재",
    description:
      "사용자 중심의 안드로이드 앱 개발 및 유지보수를 담당하고 있습니다. MVVM 아키텍처를 적용하여 확장 가능하고 유지보수가 용이한 코드를 작성하고 있습니다.",
    achievements: [
      "앱 사용자 경험 개선을 통해 사용자 만족도 30% 향상",
      "앱 성능 최적화를 통해 앱 크래시율 50% 감소",
      "CI/CD 파이프라인 구축으로 배포 시간 70% 단축",
    ],
  },
  {
    title: "주니어 안드로이드 개발자",
    company: "XYZ Solutions",
    period: "2020 - 2022",
    description:
      "다양한 안드로이드 앱 개발 프로젝트에 참여하며 실무 경험을 쌓았습니다. 팀원들과의 협업을 통해 효율적인 개발 프로세스를 구축했습니다.",
    achievements: [
      "신규 앱 출시 및 기존 앱 유지보수 담당",
      "코드 리뷰 프로세스 개선으로 버그 발생률 40% 감소",
      "주니어 개발자 멘토링 프로그램 운영",
    ],
  },
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const scrollThreshold = 100; // 스크롤 임계값

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 임계값을 넘으면 상태 업데이트
      const shouldBeScrolled = window.scrollY > scrollThreshold;
      
      // 상태가 변경될 때만 업데이트
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    // 초기 스크롤 위치 확인
    handleScroll();
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]); // isScrolled를 의존성 배열에 추가.

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingDone(true);
    }, 2000); // 타이핑 애니메이션 시간과 동일하게 설정

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <style jsx global>{`
        :root {
          --cursor-color: #fff;
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: var(--cursor-color); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .typing-text {
          overflow: hidden;
          white-space: normal;
          border-right: 4px solid var(--cursor-color);
          animation: typing 2s steps(26, end), blink-caret 1.1s step-end infinite;
        }
        @media (min-width: 768px) {
          .typing-text {
            white-space: nowrap;
          }
        }
        
        /* 스크롤에 따른 헤더바 스타일 */
        .header {
          position: fixed;
          top: 0;
          z-index: 50;
          width: 100%;
          transition: background-color 0.5s ease, box-shadow 0.5s ease;
          background-color: transparent;
        }
        
        .header.scrolled {
          background-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        /* 스크롤 위치에 따라 헤더바 스타일 변경 */
        @media (min-width: 768px) {
          .header {
            background-color: transparent;
          }
          
          .header.scrolled {
            background-color: rgba(255, 255, 255, 0.8);
          }
        }
      `}</style>
      <header className={`fixed top-0 z-50 w-full transition-all duration-700 ${isScrolled ? "bg-white/80 shadow-md" : "bg-transparent"}`}>
        <NavigationMenu isScrolled={isScrolled} />
      </header>
      <main className="flex-1">
        {/* Intro Section */}
        <div id="intro" className="relative flex min-h-[calc(100vh)] w-full flex-col items-center justify-center space-y-8 text-center overflow-hidden">
          {/* 안드로이드 테마 그라데이션 배경 */}
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#3DDC84] via-[#083042] to-[#083042]"
            style={{
              backgroundSize: "200% 200%",
              animation: "gradient 15s ease infinite",
            }}
          />
          
          {/* 코드 파티클 배경 효과 */}
          <div className="absolute inset-0 w-full h-full opacity-10"
            style={{ 
              background: "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0.5px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 0.5px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          {/* 안드로이드 로봇 형태의 블러 효과 - 헤드 */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-64 h-32 bg-[#3DDC84]/30 rounded-t-full blur-3xl animate-pulse"></div>
          
          {/* 안드로이드 로봇 형태의 블러 효과 - 바디 */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-48 h-64 bg-[#3DDC84]/20 rounded-b-3xl blur-3xl animate-pulse delay-500"></div>
          
          {/* 안드로이드 로봇 형태의 블러 효과 - 왼쪽 안테나 */}
          <div className="absolute top-[15%] left-[calc(50%-35px)] w-6 h-12 bg-[#3DDC84]/40 rounded-full blur-xl animate-pulse delay-300"></div>
          
          {/* 안드로이드 로봇 형태의 블러 효과 - 오른쪽 안테나 */}
          <div className="absolute top-[15%] left-[calc(50%+30px)] w-6 h-12 bg-[#3DDC84]/40 rounded-full blur-xl animate-pulse delay-700"></div>
          
          {/* 안드로이드 로봇 형태의 블러 효과 - 왼쪽 팔 */}
          <div className="absolute top-[40%] left-[calc(50%-50px)] w-12 h-40 bg-[#3DDC84]/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          {/* 안드로이드 로봇 형태의 블러 효과 - 오른쪽 팔 */}
          <div className="absolute top-[40%] left-[calc(50%+40px)] w-12 h-40 bg-[#3DDC84]/20 rounded-full blur-2xl animate-pulse delay-1200"></div>
          
          {/* 코드 입자 효과 */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#3DDC84]/60 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#3DDC84]/60 rounded-full animate-ping delay-200"></div>
          <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-white/40 rounded-full animate-ping delay-500"></div>
          <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping delay-700"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-[#3DDC84]/60 rounded-full animate-ping delay-1000"></div>
          
          {/* 코드 스니펫 효과 - 왼쪽 */}
          <div className="absolute left-10 top-1/3 w-40 opacity-20 animate-pulse delay-300">
            <div className="h-2 w-full bg-[#3DDC84] mb-2 rounded"></div>
            <div className="h-2 w-3/4 bg-white mb-2 rounded"></div>
            <div className="h-2 w-1/2 bg-white mb-2 rounded"></div>
            <div className="h-2 w-2/3 bg-[#3DDC84] rounded"></div>
          </div>
          
          {/* 코드 스니펫 효과 - 오른쪽 */}
          <div className="absolute right-10 bottom-1/3 w-40 opacity-20 animate-pulse delay-700">
            <div className="h-2 w-full bg-white mb-2 rounded"></div>
            <div className="h-2 w-3/4 bg-[#3DDC84] mb-2 rounded"></div>
            <div className="h-2 w-2/3 bg-white mb-2 rounded"></div>
            <div className="h-2 w-1/2 bg-[#3DDC84] rounded"></div>
          </div>
          
          <AnimatedSection>
            <div className="relative z-20">
              <div className="space-y-4 p-8">
                <h1 className={`text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-white`}>
                  끊임없이 배우고 성장하는 개발자
                </h1>
                <h1 className={`text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-white p-2`}>
                  박진솔의 포트폴리오입니다.
                </h1>
                <br />
                <h1 className="text-xl font-medium tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl text-[#3DDC84] p-4">
                  Android Developer
                </h1>
              </div>
            </div>
          </AnimatedSection>
          
          {/* 스크롤 인디케이터 */}
          <ScrollIndicator />
        </div>

        {/* About Me Section */}
        <AnimatedSection id="about" className="container py-12 md:py-24">
          <div className="mx-auto max-w-[1000px] space-y-8">
            <div className="space-y-4 text-center">
              <AnimatedText>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  About Me
                </h2>
              </AnimatedText>
              <AnimatedText>
                <p className="text-base text-muted-foreground sm:text-lg">
                  저를 소개합니다.
                </p>
              </AnimatedText>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <AnimatedCard className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="relative h-48 w-48 overflow-hidden rounded-full border-[1.5px] border-gray-200 bg-white">
                    <Image
                      src={`/images/${aboutMeData.profile.image.src.replace('./images/', '')}`}
                      alt={aboutMeData.profile.image.alt}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold sm:text-xl">{aboutMeData.profile.title}</h3>
                    <p className="text-sm text-muted-foreground sm:text-base">{aboutMeData.profile.content}</p>
                  </div>
                </div>
              </AnimatedCard>
              <div className="space-y-8">
                <AnimatedCard className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-6 text-lg font-bold text-center sm:text-xl">Profile</h3>
                  <div className="grid gap-3">
                    {Object.entries(aboutMeData.profile_info).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm font-medium sm:text-base">{key}</span>
                        <span className="text-xs text-muted-foreground sm:text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
                <AnimatedCard className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-6 text-lg font-bold text-center sm:text-xl">Experience</h3>
                  <div className="grid gap-3">
                    {aboutMeData.experience.map((exp, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium sm:text-base">{exp.description}</span>
                          <span className="text-xs text-muted-foreground sm:text-sm">{exp.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skills" className="container py-12 md:py-24">
          <div className="mx-auto max-w-[1000px] space-y-8">
            <div className="space-y-4 text-center">
              <AnimatedText>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  SKILLS
                </h2>
              </AnimatedText>
              <AnimatedText>
                <p className="text-base text-muted-foreground sm:text-lg">
                  제가 보유한 기술 스택입니다.
                </p>
              </AnimatedText>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {skillCategories.map((category, index) => (
                <AnimatedCard
                  key={category.name}
                  className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
                >
                  <h3 className="mb-4 text-lg font-semibold sm:text-xl">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary sm:px-3 sm:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="container py-12 md:py-24">
          <div className="mx-auto max-w-[1000px] space-y-8">
            <div className="space-y-4 text-center">
              <AnimatedText>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  PROJECTS
                </h2>
              </AnimatedText>
              <AnimatedText>
                <p className="text-base text-muted-foreground sm:text-lg">
                  제가 개발한 안드로이드 앱 프로젝트들을 소개합니다.
                </p>
              </AnimatedText>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project, index) => (
                <AnimatedCard key={project.title}>
                  <ProjectCard
                    title={project.title}
                    period={project.period}
                    summary={project.summary}
                    techStack={project.tech_stack}
                    images={project.img_list}
                    imgLogo={project.img_logo}
                    img={project.img}
                    url={project.playstore_url}
                    devPart={project.dev_part}
                    keyFunction={project.key_function}
                    meaning={project.meaning}
                    pdf={project.pdf}
                  />
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Career Section */}
        <AnimatedSection id="career" className="container py-12 md:py-24">
          <div className="mx-auto max-w-[1000px] space-y-8">
            <div className="space-y-4 text-center">
              <AnimatedText>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  CAREER
                </h2>
              </AnimatedText>
              <AnimatedText>
                <p className="text-base text-muted-foreground sm:text-lg">
                  제가 경험한 직무와 프로젝트를 소개합니다.
                </p>
              </AnimatedText>
            </div>
            <div className="space-y-8">
              {careerData.map((career, index) => (
                <AnimatedCard key={career.id} className="rounded-lg border bg-card p-6 shadow-sm">
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
                        <h3 className="text-lg font-semibold sm:text-xl">{career.position}</h3>
                        <p className="text-base text-muted-foreground sm:text-lg">{career.company}</p>
                        <p className="text-xs text-muted-foreground sm:text-sm">{career.duration}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary sm:px-3 sm:text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {career.projects.map((project, projectIndex) => (
                          <div key={projectIndex} className="space-y-2">
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
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Footer Section */}
        <footer className="py-8 md:py-12 bg-gray-200">
          <div className="container flex flex-col items-center justify-center">
            <p className="text-center text-xs text-muted-foreground sm:text-sm">
              © 2025 Park Jin Sol. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
} 