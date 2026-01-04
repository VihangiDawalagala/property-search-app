// Contact page with form for users to send messages to the company
import { useState } from "react"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button"
import { useToast } from "../hooks/use-toast"
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react"

export default function ContactPage() {
  // Stores all the form field values as user types
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  // Tracks if form is being submitted to show loading state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Updates form data when user types in any input field
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handles form submission when user clicks send button
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulates sending the message and shows success notification
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+44 20 1234 5678",
      link: "tel:+442012345678",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@heavenlyhomes.com",
      link: "mailto:hello@heavenlyhomes.com",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Property Lane, London, UK W1A 1AA",
      link: null,
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon-Fri: 9am-6pm, Sat: 10am-4pm",
      link: null,
    },
  ]

  return (
    <>
      <Header />
      <main className="container py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground text-balance">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty">
              Have questions about a property or need assistance? We're here to help. Reach out to our friendly team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Card className="border-border/50 h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.smith@example.com"
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 7700 900000"
                        className="border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Property enquiry"
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        required
                        rows={6}
                        className="border-border/50 focus:border-primary resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                          {item.link ? (
                            <a href={item.link} className="text-muted-foreground hover:text-primary transition-colors">
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">{item.content}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6 pb-6">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Quick Response Guarantee</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We pride ourselves on excellent customer service. You can expect a response to your enquiry within
                    24 hours during business days.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For urgent matters, please call us directly during office hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9349292624104!2d-0.1419!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwOCczMC44Ilc!5e0!3m2!1sen!2suk!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location Map"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


