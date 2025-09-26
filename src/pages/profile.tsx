"use client"

import { useState } from 'react'
import {useTranslations} from 'next-intl';

export default function Profile() {
  const t_profile = useTranslations('Profile');

  return (
    <>
      <p className="font-black text-center text-2xl lg:text-3xl">
        {t_profile('page_title')}
      </p>
      <div className="mainarea_width flex-grow"></div>
    </>
  )
}