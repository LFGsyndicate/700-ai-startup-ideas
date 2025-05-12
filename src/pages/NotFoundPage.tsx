
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 md:py-32">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
}
