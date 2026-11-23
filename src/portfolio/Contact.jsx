import React from 'react'
import { CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../contexts/LanguageContext'
import feuilleRose from '../assets/feuille-rose.svg'
import iconeEmail from '../assets/contact/icone-email.svg'
import iconeLocalisation from '../assets/contact/icone-localisation.svg'
import iconeTelephone from '../assets/contact/icone-telephone.svg'
import iconeAvion from '../assets/contact/icone-avion-papier.svg'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const serviceId = 'service_o2agbrt'
      const templateId = 'template_fhccxqj'
      const publicKey = '2mm7OhtfSAG2NfBqO'

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      console.error('Error details:', error.text || error.message)
      alert(`${t.contact.error}: ${error.text || error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputClass =
    'w-full rounded-xl border-2 border-[#f58c76] bg-white text-ink placeholder:text-ink-faint px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f58c76]/40 transition-colors'

  return (
    <section id="contact" className="relative overflow-hidden pt-24 pb-6">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-moss opacity-[0.08] blur-[7rem]" />
        <div className="absolute -right-28 top-1/4 h-[32rem] w-[32rem] rounded-full bg-honey opacity-[0.07] blur-[7rem]" />
        <div className="absolute left-[12%] -bottom-32 h-[30rem] w-[30rem] rounded-full bg-brand opacity-[0.06] blur-[7rem]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold section-title section-title--moss mb-4">{t.contact.title}</h2>
          <p className="text-xl text-ink-muted max-w-3xl mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start md:mx-auto md:max-w-xl lg:mx-0 lg:max-w-none">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-ink">{t.contact.getInTouch}</h3>
              <p className="text-ink-muted leading-relaxed">{t.contact.description}</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-moss/20 text-moss-dark border border-moss/30">
                  <img src={iconeEmail} alt="" aria-hidden="true" className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-medium text-ink">{t.contact.emailLabel}</h4>
                  <a
                    href="mailto:sarah@codelle.ch"
                    className="contact-email-link relative inline-block overflow-hidden text-ink font-medium hover:text-moss hover:underline underline-offset-4 transition-colors duration-300"
                  >
                    sarah@codelle.ch
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-moss/20 text-moss-dark border border-moss/30">
                  <img src={iconeLocalisation} alt="" aria-hidden="true" className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-medium text-ink">{t.contact.locationLabel}</h4>
                  <p className="text-ink-muted">{t.contact.locationValue}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-moss/20 text-moss-dark border border-moss/30">
                  <img src={iconeTelephone} alt="" aria-hidden="true" className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-medium text-ink">{t.contact.responseTime}</h4>
                  <p className="text-ink-muted">{t.contact.responseTimeValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-gradient relative rounded-2xl p-8 border-[1.5px] lg:border-[1.75px] border-[#f58c76] shadow-lg">
            <img
              src={feuilleRose}
              alt=""
              aria-hidden="true"
              className="contact-form-leaf pointer-events-none absolute z-10 w-8 -top-3 -right-1.5 sm:w-10 sm:-top-4 sm:-right-3"
            />
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-[#F3EFE6]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#F3EFE6] mb-2">{t.contact.success}</h3>
                <p className="text-[#F3EFE6]/90">{t.contact.thankYou}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#F3EFE6] mb-2">
                      {t.contact.yourName}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder={t.contact.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#F3EFE6] mb-2">
                      {t.contact.emailAddress}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#F3EFE6] mb-2">
                      {t.contact.projectDetails}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`${inputClass} resize-none`}
                      placeholder={t.contact.messagePlaceholder}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#fff8e5] hover:bg-[#fff1cc] disabled:opacity-60 text-[#6e4a2c] border-[1.5px] lg:border-[1.75px] border-[#f58c76] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-3.5 flex items-center justify-center font-medium text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#6e4a2c] mr-2"></div>
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <img src={iconeAvion} alt="" aria-hidden="true" className="w-6 h-6 mr-2" />
                      {t.contact.send}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
