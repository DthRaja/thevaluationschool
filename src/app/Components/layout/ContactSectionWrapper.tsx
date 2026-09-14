'use client'

import { usePathname } from 'next/navigation';
import React from 'react'
import type { ScheduleCalendarData } from '@/app/layout';
import ContactSection from './ContactSection';

interface ContactSectionWrapperProps {
    countries: string[];
    countryCodes: string[];
    calendar: ScheduleCalendarData;
}

const ContactSectionWrapper = ({ countries, countryCodes, calendar }: ContactSectionWrapperProps) => {
    const pathname = usePathname();
    const excluding = ['contact']

    if (excluding.includes(pathname.split('/')[1])) return null;
    return (
        <>
            <ContactSection countries={countries} countryCodes={countryCodes} calendar={calendar} />
        </>
    )
}

export default ContactSectionWrapper