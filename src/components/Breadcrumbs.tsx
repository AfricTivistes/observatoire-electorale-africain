import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav 
      aria-label="Fil d'Ariane" 
      className="overflow-x-auto whitespace-nowrap py-2 scrollbar-none"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item) => (
          <li key={item.label} className="flex items-center min-w-fit">
            {item.href ? (
              <>
                <a 
                  href={item.href} 
                  className="text-africa-dark hover:text-africa-dark transition-colors"
                  aria-label={`Aller à ${item.label}`}
                >
                  {item.label}
                </a>
                <span 
                  className="mx-2 text-gray-400" 
                  aria-hidden="true"
                >
                  /
                </span>
              </>
            ) : (
              <span className="text-gray-600 font-medium truncate">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
