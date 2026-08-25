'use client'

import { usePathname } from 'next/navigation';
import React from 'react'
import ContactSection from './ContactSection';

const ContactSectionWrapper = () => {
    const pathname = usePathname();
    const excluding = ['contact']

    if (excluding.includes(pathname.split('/')[1])) return null;
    return (
        <>
            <ContactSection />
        </>
    )
}

export default ContactSectionWrapper