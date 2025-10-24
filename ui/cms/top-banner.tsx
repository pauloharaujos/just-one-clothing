export default function Page() {
    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full"></div>
            
            <div className="flex items-center justify-center text-center relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-white/20">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                    </div>
                    <p className="text-[15px] text-white font-semibold pr-6 leading-relaxed">
                        🎉 Limited Time Offer! Enjoy 20% OFF your first purchase –
                        <a href="javascript:void(0)" className="ml-1 underline hover:no-underline transition-all duration-200 font-bold">Shop Now!</a>
                    </p>
                </div>
                <div className="absolute right-0">
                    <button className="p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 cursor-pointer fill-white group-hover:scale-110 transition-transform duration-200" viewBox="0 0 320.591 320.591">
                            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000" />
                            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}