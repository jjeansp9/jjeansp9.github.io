import { NavigationMenu } from "@/components/navigation-menu";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationMenu />
      <main className="flex-1">
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-[800px] space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                About Me
              </h1>
              <p className="text-lg text-muted-foreground">
                안드로이드 앱 개발자로서의 저를 소개합니다.
              </p>
            </div>
            <div className="prose prose-gray mx-auto dark:prose-invert">
              <p>
                안녕하세요. 저는 사용자 경험을 중요시하는 안드로이드 앱 개발자입니다.
                깔끔한 UI/UX 디자인과 효율적인 코드 작성을 지향하며, 지속적인 학습과
                개선을 통해 더 나은 앱을 만들어가고 있습니다.
              </p>
              <h2>기술 스택</h2>
              <ul>
                <li>Kotlin, Java</li>
                <li>Android SDK</li>
                <li>Retrofit2, Room Database</li>
                <li>Firebase</li>
                <li>DataBinding</li>
                <li>MVVM Architecture</li>
              </ul>
              <h2>경험</h2>
              <p>
                다양한 안드로이드 앱 개발 프로젝트에 참여하며, 사용자 중심의 앱
                개발에 중점을 두고 있습니다. 최신 기술 트렌드를 주시하고 있으며,
                지속적인 학습을 통해 개발 역량을 향상시키고 있습니다.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 