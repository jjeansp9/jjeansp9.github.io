"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon, ArrowRight, X } from "lucide-react";

interface ProjectCardProps {
  title: string;
  period: string;
  summary?: string;
  techStack: string[];
  images: string[];
  imgLogo?: string;
  img: string;
  url?: string;
  devPart?: string;
  keyFunction?: string[];
  meaning?: string;
  pdf?: string;
  isWebProject?: boolean;
}

export function ProjectCard({
  title,
  period,
  summary,
  techStack,
  images,
  imgLogo,
  img,
  url,
  devPart,
  keyFunction,
  meaning,
  pdf,
  isWebProject = false,
}: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imageError, setImageError] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {pdf ? (
          <div className="group relative h-full overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50 hover:scale-[1.02] cursor-pointer">
            <div className="flex h-full flex-col space-y-4">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-muted">
                {!imageError && (img || images.length > 0) ? (
                  <Image
                    src={img.startsWith('/') ? img : `/${img}`}
                    alt={title}
                    fill
                    unoptimized
                    className={`object-cover transition-transform ${isWebProject ? 'object-contain' : ''}`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
              </div>
              <div className="flex h-full flex-col">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">{title}</h3>
                  <p className="text-sm text-muted-foreground">{period}</p>
                  {summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors duration-300 group-hover:bg-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-primary/80">
                  <span>프로젝트 보기</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="group relative h-full overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50 hover:scale-[1.02] cursor-pointer">
            <div className="flex h-full flex-col space-y-4">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-muted">
                {!imageError && (img || images.length > 0) ? (
                  <Image
                    src={img.startsWith('/') ? img : `/${img}`}
                    alt={title}
                    fill
                    unoptimized
                    className={`object-cover transition-transform ${isWebProject ? 'object-contain' : ''}`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
              </div>
              <div className="flex h-full flex-col">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">{title}</h3>
                  <p className="text-sm text-muted-foreground">{period}</p>
                  {summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors duration-300 group-hover:bg-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-primary/80">
                  <span>프로젝트 보기</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogTrigger>
      {pdf ? (
        <DialogContent className="[&>button]:hidden max-w-5xl h-[95vh] overflow-hidden rounded-2xl bg-card/95 backdrop-blur-md shadow-xl scrollbar-hide p-0">
          <div className="sticky top-0 z-10 bg-card backdrop-blur-md border-b border-primary/20 flex justify-between items-center h-12 p-8">
            <DialogTitle className="text-xl font-bold flex items-center">{title} PDF</DialogTitle>
            <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground flex items-center">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <div className="w-full h-[calc(90vh-3rem)] bg-white p-0 m-0">
            <iframe 
              src={pdf?.startsWith('/') ? pdf : `/${pdf}`} 
              className="w-full h-full border-none" 
              onError={(e) => {
                const target = e.target as HTMLIFrameElement;
                target.style.display = 'none';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'flex flex-col items-center justify-center w-full h-full text-center p-8';
                errorDiv.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary mb-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <h3 class="text-xl font-semibold mb-2">PDF를 로드할 수 없습니다</h3>
                  <p class="text-muted-foreground mb-4">파일을 찾을 수 없거나 접근할 수 없습니다.</p>
                  <a href="${pdf?.startsWith('/') ? pdf : `/${pdf}`}" target="_blank" rel="noopener noreferrer" class="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    PDF 직접 열기
                  </a>
                `;
                target.parentNode?.appendChild(errorDiv);
              }}
            />
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="[&>button]:hidden max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card/95 backdrop-blur-md shadow-xl scrollbar-hide p-0">
          <div className="sticky top-0 z-10 bg-card backdrop-blur-md border-b border-primary/20 flex justify-between items-center h-12 p-8">
            <DialogTitle className="text-xl font-bold flex items-center">README.md</DialogTitle>
            <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground flex items-center">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <div className="space-y-8 p-12">
            <div className="relative aspect-[12/9] w-full mx-auto overflow-hidden rounded-xl shadow-inner flex items-center justify-center">
              {!imageError && images.length > 0 ? (
                <div className="relative h-full w-full max-w-[900px] mx-auto">
                  <Image
                    src={images[currentImageIndex].startsWith('/') ? images[currentImageIndex] : `/${images[currentImageIndex]}`}
                    alt={`${title} screenshot ${currentImageIndex + 1}`}
                    fill
                    unoptimized
                    className="object-contain"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/10 backdrop-blur-sm border-none shadow-md hover:bg-primary/20"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/10 backdrop-blur-sm border-none shadow-md hover:bg-primary/20"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 px-3 py-1 text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            )}
            <div className="flex items-start space-x-4">
              {imgLogo && !logoError && !isWebProject ? (
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-primary/20 bg-white shadow-sm">
                  <Image
                    src={imgLogo.startsWith('/') ? imgLogo : `/${imgLogo}`}
                    alt={`${title} logo`}
                    fill
                    unoptimized
                    className="object-cover"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : !isWebProject ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10 shadow-sm">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              ) : null}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">{title}</h2>
                </div>
                <p className="text-base text-muted-foreground">{period}</p>
              </div>
            </div>
            
            <div className="w-full space-y-10">
              {url && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Play Store</h3>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-base text-primary hover:underline flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {url}
                  </a>
                </div>
              )}
              {devPart && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Dev Part</h3>
                  <p className="text-base text-muted-foreground">{devPart}</p>
                </div>
              )}
              {keyFunction && keyFunction.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Key Function</h3>
                  <ul className="list-disc pl-5 text-base text-muted-foreground space-y-1">
                    {keyFunction.map((func, idx) => (
                      <li key={idx}>{func}</li>
                    ))}
                  </ul>
                </div>
              )}
              {summary && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Summary</h3>
                  <p className="text-base text-muted-foreground whitespace-pre-line">{summary}</p>
                </div>
              )}
              {meaning && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Meaning</h3>
                  <p className="text-base text-muted-foreground whitespace-pre-line">{meaning}</p>
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
} 