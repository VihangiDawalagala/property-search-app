// About page that displays company information and features
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Card, CardContent } from "../components/ui/card"
import { Home, Users, Award, Heart, Shield, TrendingUp } from "lucide-react"

export default function AboutPage() {
  // List of company features and benefits to display on the page
  const features = [
    {
      icon: Home,
      title: "Wide Selection",
      description: "Access thousands of properties across the UK, from cozy flats to luxurious estates",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our dedicated team of property experts is here to guide you every step of the way",
    },
    {
      icon: Award,
      title: "Trusted Service",
      description: "Over 15 years of excellence in helping people find their perfect home",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're committed to making your journey smooth",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-level security and privacy measures",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Stay informed with real-time market data and property value trends",
    },
  ]

  const stats = [
    { value: "50K+", label: "Properties Listed" },
    { value: "10K+", label: "Happy Customers" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Satisfaction Rate" },
  ]

  return (
    <>
      <Header />
      <main className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground text-balance">
              About Britannia Homes
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-pretty">
              We're passionate about helping you find the perfect place to call home. With cutting-edge search tools and
              personalized service, we make property hunting effortless and enjoyable.
            </p>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="pt-8 pb-8">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-serif text-3xl font-bold mb-8 text-center text-foreground">Our Mission</h2>
            <Card className="border-border/50">
              <CardContent className="pt-8 pb-8 px-8 md:px-12">
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  At Britannia Homes, we believe that finding your dream home should be an exciting journey, not a
                  stressful task. That's why we've built a platform that combines powerful search technology with human
                  expertise to deliver an unparalleled property search experience.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Whether you're a first-time buyer, looking to upgrade, or searching for an investment opportunity,
                  we're here to support you with transparent information, detailed property insights, and personalized
                  recommendations every step of the way.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-serif text-3xl font-bold mb-8 text-center text-foreground">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="pt-6 pb-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-12 pb-12 px-8">
                <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">Ready to Find Your Dream Home?</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Join thousands of satisfied customers who have found their perfect property with Britannia Homes
                </p>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Your Search
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


