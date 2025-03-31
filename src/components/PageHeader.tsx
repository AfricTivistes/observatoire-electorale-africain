import type React from "react"
import Breadcrumbs from "./Breadcrumbs"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  children?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs, children }) => {
  return (
    <div className="bg-white border-b border-gray-200 pt-28 pb-6 mb-8">
      <div className="container mx-auto px-4">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

        <div className="flex items-center mt-4">
          {children && <div className="mr-4">{children}</div>}
          <div>
            <h1 className="text-3xl font-bold text-farafina-dark">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader

