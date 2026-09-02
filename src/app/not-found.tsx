import ErrorState from "@/components/shared/ErrorState";

// Friendly 404 page — never a dead end.
export default function NotFound() {
  return (
    <main className="container-site py-24">
      <ErrorState
        title="That dish got eaten."
        message="The page you're looking for isn't here — maybe it was a special that's already off the menu. Let's get you somewhere good instead."
      />
    </main>
  );
}
