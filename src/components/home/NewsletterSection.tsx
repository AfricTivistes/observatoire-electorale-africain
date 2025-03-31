import type React from "react"
import { FaEnvelope } from "react-icons/fa"

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-3 p-8 md:p-12">
              <div className="flex items-center text-farafina-primary font-medium mb-2">
                <FaEnvelope className="mr-2" />
                <span>Restez Informé</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-farafina-dark mb-4">
                Abonnez-vous à Notre Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Recevez les dernières actualités sur les élections africaines, les analyses et les ressources
                directement dans votre boîte mail.
              </p>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-farafina-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-farafina-primary focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-farafina-primary text-white font-medium rounded-lg hover:bg-farafina-primary/90 transition-colors"
                >
                  S'abonner
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                En vous abonnant, vous acceptez notre politique de confidentialité. Vous pouvez vous désabonner à tout
                moment.
              </p>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-farafina-primary to-farafina-secondary p-8 md:p-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <FaEnvelope className="text-white text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Restez Connecté</h3>
                <p className="text-white/80 text-sm">Recevez nos mises à jour mensuelles et nos rapports spéciaux</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection

