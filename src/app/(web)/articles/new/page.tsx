import EditArticleForm from "@/components/articles/edit-article-form";
import { FloatingHeader } from "@/components/floating-header";
import NotAuthenticated from "@/components/not-authenticated";
import { ScrollArea } from "@/components/scroll-area";
import { getSession } from "@/services/auth";

export default async function Page() {
  const session = await getSession();

  // @ts-ignore
  if (!session) {
    return <NotAuthenticated />;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader
        session={session}
        scrollTitle="Artikel Baru"
        goBackLink="/articles"
      />

      <div className="content-wrapper">
        <div className="content">
          {session && (
            <EditArticleForm
              session={session}
              article={{
                title: "",
                slug: "",
                coverImage: "",
                content: "",
              }}
            />
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
