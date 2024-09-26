import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import TooltipWithOptions from '@/components/ui/ToolTip';

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate()

    const sectionRefs = {
        features: useRef<HTMLElement>(null),
        products: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null)
    };

    const productListRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(productListRef, { once: false });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start({ opacity: 1, transition: { duration: 0.8 } });
        } else {
            controls.start({ opacity: 0 });
        }
    }, [isInView, controls]);

    const handleNavClick = (sectionId: string) => {
        sectionRefs[sectionId as keyof typeof sectionRefs].current?.scrollIntoView({
            behavior: 'smooth'
        });
        setMobileMenuOpen(false);
    };

    const scrollProducts = (direction: 'left' | 'right') => {
        const scrollAmount = productListRef.current?.offsetWidth || 0;
        const currentScroll = productListRef.current?.scrollLeft || 0;

        if (direction === 'right') {
            productListRef.current?.scrollTo({ left: currentScroll + scrollAmount, behavior: 'smooth' });
        } else if (direction === 'left') {
            productListRef.current?.scrollTo({ left: currentScroll - scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-indigo-900 text-white fixed w-full z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">KioskInventory</div>
                    <nav className="hidden md:flex space-x-6 items-center">
                        <button onClick={() => navigate('/products')} className="hover:text-indigo-300 transition duration-300">🌟Products</button>
                        <button onClick={() => handleNavClick('products')} className={`hover:text-indigo-300 transition duration-300`}>Featured Products</button>
                        <button onClick={() => handleNavClick('contact')} className={`hover:text-indigo-300 transition duration-300 `}>Contact</button>
                        <button onClick={() => navigate('/login')} className="bg-white text-indigo-900 px-4 py-2 rounded font-semibold hover:bg-indigo-100 transition duration-300">Login</button>
                    </nav>
                    <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden bg-indigo-800 py-2">
                        <button onClick={() => navigate('/products')} className="block w-full text-left px-4 py-2 hover:bg-indigo-700 transition duration-300">Products</button>
                        <button onClick={() => handleNavClick('products')} className="block w-full text-left px-4 py-2 hover:bg-indigo-700 transition duration-300">Featured Products</button>
                        <button onClick={() => handleNavClick('contact')} className="block w-full text-left px-4 py-2 hover:bg-indigo-700 transition duration-300">Contact</button>
                        <button onClick={() => navigate('/login')} className="block w-full text-left px-4 py-2 hover:bg-indigo-700 transition duration-300">Login</button>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-indigo-800 text-white py-20 pt-60"
            >
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Streamline Your Kiosk Inventory</h1>
                    <p className="text-xl mb-8">Effortlessly manage and sell products with our advanced kiosk system</p>
                    <button onClick={() => navigate('/login')} className="bg-white text-indigo-800 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition duration-300">Get Started</button>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                ref={sectionRefs.features}
                id="features"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="py-20 bg-white"
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Powerful Features for Your Kiosk</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Real-time Inventory Tracking",
                                description: "Monitor stock levels instantly across all your kiosks"
                            },
                            {
                                title: "Smart Checkout Process",
                                description: "Streamline sales with our intuitive, fast checkout system"
                            },
                            {
                                title: "Advanced Analytics",
                                description: "Gain valuable insights with comprehensive sales and inventory reports"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-100 p-6 rounded shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-xl font-semibold mb-4 text-indigo-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Products Section */}
            <motion.section
                ref={sectionRefs.products}
                id="products"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={controls}
                transition={{ duration: 0.8 }}
                className="bg-gray-200 py-20"
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Products</h2>
                    <div className="relative">
                        <button
                            onClick={() => scrollProducts('left')}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition"
                        >
                            <ChevronLeft />
                        </button>
                        <div
                            ref={productListRef}
                            className="flex space-x-6 overflow-x-auto scrollbar-style py-2"
                            style={{ scrollSnapType: 'x mandatory' }}
                        >
                            {[
                                { name: "Gourmet Snack Box", price: "₨ 3.99" },
                                { name: "Gourmet Snack Box", price: "₨ 3.99" },
                                { name: "Gourmet Snack Box", price: "₨ 3.99" },
                                { name: "Gourmet Snack Box", price: "₨ 3.99" },
                                { name: "Organic Energy Drink", price: "₨ 4.49" },
                                { name: "Artisan Sandwich", price: "₨ 6.99" },
                                { name: "Local Fresh Fruit Cup", price: "₨ 2.99" }
                            ].map((product, index) => (
                                <div key={index} className="bg-white p-6 rounded shadow-md hover:shadow-lg transition duration-300 text-center flex-shrink-0 w-60">
                                    <div className="w-32 h-32 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-indigo-700 text-4xl">🍎</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-indigo-900 mb-2">{product.name}</h3>
                                    <p className="text-gray-600">{product.price}</p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => scrollProducts('right')}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
                ref={sectionRefs.contact}
                id="contact"
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-indigo-900"
            >
                <section ref={sectionRefs.contact} id="contact" className="bg-indigo-900 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Kiosk Business?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied kiosk owners who have revolutionized their operations with our inventory system</p>
                        <button className="bg-white text-indigo-900 px-8 py-3 rounded font-semibold text-lg hover:bg-indigo-100 transition duration-300 shadow-lg">
                            Schedule a Demo
                        </button>
                    </div>
                </section>
            </motion.section>
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-2xl font-bold mb-4 md:mb-0">KioskInventory</div>
                        <nav className="flex space-x-4">
                            <a href="#" className="hover:text-indigo-300 transition duration-300">Privacy Policy</a>
                            <a href="#" className="hover:text-indigo-300 transition duration-300">Terms of Service</a>
                            <a href="#" className="hover:text-indigo-300 transition duration-300">Contact</a>
                        </nav>
                    </div>
                    <div className="mt-8 text-center text-gray-400">
                        &copy; {new Date().getFullYear()} KioskInventory. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
