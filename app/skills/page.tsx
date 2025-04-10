import { NavigationMenu } from "@/components/navigation-menu";

const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["Kotlin", "Java", "Python", "JavaScript", "TypeScript"],
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
    skills: ["Room Database", "SQLite", "Firebase Realtime Database"],
  },
  {
    name: "Networking",
    skills: ["Retrofit2", "OkHttp", "REST API", "GraphQL"],
  },
  {
    name: "Architecture",
    skills: ["MVVM", "Clean Architecture", "Repository Pattern"],
  },
  {
    name: "Others",
    skills: ["Git", "GitHub", "Android Studio", "IntelliJ IDEA"],
  },
];

export default function SkillsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationMenu />
      <main className="flex-1">
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-[800px] space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Skills
              </h1>
              <p className="text-lg text-muted-foreground">
                제가 보유한 기술 스택을 소개합니다.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {skillCategories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
                >
                  <h2 className="mb-4 text-xl font-semibold">{category.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
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