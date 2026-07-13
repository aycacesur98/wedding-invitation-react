import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Section } from './Section';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const RSVP_SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbx-F1PKODUFCkf3MXPv_uvSeOgp1BCe38m1tXzhp-Sg38WjsH9UhZqrkczaBoXES-tPaQ/exec';
const GUEST_API_URL = 'https://script.google.com/macros/s/AKfycbwRHNQ9rH-Aa48lp-jBMbejWDzhpxzb00pD1fZPoRwmHx6Bh22l62N541j5_jk49zeY6g/exec';

interface RSVPFormProps {
  slug?: string;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ slug }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [guestQuota, setGuestQuota] = useState<number | null>(null);

  // Dil kontrolü
  const location = useLocation();
  const isEnglish = location.pathname.includes('/en');

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<any>();
  
  const asistiraValue = watch('asistira');
  const hasPlusOne = watch('has_plus_one');

  useEffect(() => {
    if (slug) {
      fetch(`${GUEST_API_URL}?slug=${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setValue('nombre_completo', data.isim);
            const parsedQuota = parseInt(data.kontenjan, 10);
            setGuestQuota(!isNaN(parsedQuota) ? parsedQuota : 1);
          }
        })
        .catch(err => console.error("Kontenjan çekilemedi:", err));
    }
  }, [slug, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const finalData = {
      ...data,
      has_plus_one: (guestQuota === 1) ? 'no' : data.has_plus_one,
      plus_one_name: (guestQuota === 1) ? '' : data.plus_one_name,
    };

    try {
      await fetch(RSVP_SUBMIT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(isEnglish ? 'An error occurred. Please try again.' : 'Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Section id="rsvp" className="text-center py-24">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-primary/10 max-w-sm mx-auto flex flex-col items-center"
        >
          <CheckCircle className="w-20 h-20 text-[#4C6444] mb-6 opacity-90" />
          <h2 className="font-script text-5xl text-text tracking-wide">
            {isEnglish ? 'Thank you!' : 'Teşekkürler!'}
          </h2>
        </motion.div>
      </Section>
    );
  }

  const extraGuestsAllowed = guestQuota ? guestQuota - 1 : 1;

  return (
    <Section id="rsvp" className="max-w-2xl" withPattern>
      <div className="text-center mb-10">
        <h2 className="font-script text-4xl text-text mb-2">
          {isEnglish ? 'RSVP' : 'Katılım Durumu'}
        </h2>
        <p className="font-sans text-text/60 tracking-widest text-[11px] md:text-xs">
          {isEnglish ? 'PLEASE RSVP BY AUGUST 8, 2026, THANK YOU!' : '8 AĞUSTOS 2026 TARİHİNE KADAR GERİ DÖNÜŞ YAPMANIZI RİCA EDERİZ, TEŞEKKÜRLER!'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-10 rounded-lg shadow-lg border border-primary/10">
        
        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">{isEnglish ? 'Full Name *' : 'Ad Soyad *'}</label>
          <input
            {...register('nombre_completo', { required: isEnglish ? 'Name is required' : 'İsim alanı zorunludur' })}
            type="text"
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30"
            placeholder={isEnglish ? 'Your full name' : 'Adınız ve soyadınız'}
          />
          {errors.nombre_completo && <span className="text-red-500 text-xs font-sans">{(errors.nombre_completo as any).message}</span>}
        </div>

        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">{isEnglish ? 'Mobile Phone *' : 'Cep Telefonu *'}</label>
          <input
            {...register('telefon', { 
              required: isEnglish ? 'Phone is required' : 'Telefon numarası zorunludur',
              pattern: {
                value: /^\+?[0-9\s-]{10,}$/,
                message: isEnglish ? "Please enter a valid phone number" : "Lütfen geçerli bir telefon numarası giriniz"
              }
            })}
            type="tel"
            defaultValue="+90"
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30 font-sans"
            placeholder="+90 5XX XXX XX XX"
          />
          {errors.telefon && <span className="text-red-500 text-xs font-sans">{(errors.telefon as any).message}</span>}
        </div>

        <div className="space-y-2">
          <label className="block font-serif text-lg text-text">{isEnglish ? 'Will you be attending our wedding? *' : 'Düğünümüze katılabilecek misiniz? *'}</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input {...register('asistira', { required: isEnglish ? 'Please select an option' : 'Lütfen bir seçenek belirleyin' })} type="radio" value="Evet, katılıyorum" className="text-primary focus:ring-primary h-4 w-4" />
              <span className="font-sans text-text">{isEnglish ? 'Yes, I will attend' : 'Evet, katılıyorum'}</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input {...register('asistira', { required: isEnglish ? 'Please select an option' : 'Lütfen bir seçenek belirleyin' })} type="radio" value="Hayır, katılamıyorum" className="text-primary focus:ring-primary h-4 w-4" />
              <span className="font-sans text-text">{isEnglish ? 'No, I cannot attend' : 'Hayır, katılamıyorum'}</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input {...register('asistira', { required: isEnglish ? 'Please select an option' : 'Lütfen bir seçenek belirleyin' })} type="radio" value="Henüz bilmiyorum" className="text-primary focus:ring-primary h-4 w-4" />
              <span className="font-sans text-text">{isEnglish ? 'Not sure yet' : 'Henüz bilmiyorum'}</span>
            </label>
          </div>
          {errors.asistira && <span className="text-red-500 text-xs font-sans">{(errors.asistira as any).message}</span>}
        </div>

        {(asistiraValue === 'Evet, katılıyorum' || asistiraValue === 'Henüz bilmiyorum') && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-6 pt-4 border-t border-primary/10"
          >
            {(guestQuota === null || guestQuota >= 2) && (
              <div className="space-y-2">
                <label className="block font-serif text-lg text-text">
                  {guestQuota && guestQuota > 2 
                    ? (isEnglish ? `Will you be bringing guests (max ${extraGuestsAllowed})?` : `Yanınızda misafirleriniz (en fazla ${extraGuestsAllowed} kişi) olacak mı?`)
                    : (isEnglish ? `Will you be bringing a plus one?` : `Yanınızda artı bir misafirimiz olacak mı?`)}
                </label>
                <div className="flex space-x-6 p-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input {...register('has_plus_one')} type="radio" value="yes" className="text-primary focus:ring-primary" />
                    <span className="font-sans text-text">{isEnglish ? 'Yes' : 'Evet'}</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input {...register('has_plus_one')} type="radio" value="no" className="text-primary focus:ring-primary" />
                    <span className="font-sans text-text">{isEnglish ? 'No' : 'Hayır'}</span>
                  </label>
                </div>

                {hasPlusOne === 'yes' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-1 bg-secondary/10 p-4 rounded border border-primary/5 mt-4"
                  >
                    <label className="block font-serif text-base text-text">
                      {guestQuota && guestQuota > 2 
                        ? (isEnglish ? `Full names of your guests (max ${extraGuestsAllowed}) *` : `Gelecek Diğer Kişilerin Adı Soyadı (Maksimum ${extraGuestsAllowed} kişi) *`)
                        : (isEnglish ? `Full name of your guest *` : `Gelecek Diğer Kişinin Adı Soyadı *`)}
                    </label>
                    {guestQuota && guestQuota > 2 ? (
                      <textarea
                        {...register('plus_one_name', { required: isEnglish ? 'Please enter guest names' : 'Lütfen misafirlerinizin adını belirtiniz' })}
                        rows={2}
                        className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-white"
                        placeholder={isEnglish ? 'e.g. John Doe, Jane Doe' : 'Örn: Ali Yılmaz, Ayşe Yılmaz'}
                      />
                    ) : (
                      <input
                        {...register('plus_one_name', { required: isEnglish ? 'Please enter guest name' : 'Lütfen eşinizin/misafirinizin adını belirtiniz' })}
                        type="text"
                        className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-white"
                        placeholder={isEnglish ? 'Guest full name' : 'Refakatçinizin adı ve soyadı'}
                      />
                    )}
                    {errors.plus_one_name && <span className="text-red-500 text-xs font-sans">{(errors.plus_one_name as any).message}</span>}
                  </motion.div>
                )}
              </div>
            )}
            
            {guestQuota === 1 && (
              <div className="text-sm text-text/60 italic px-2">
                * {isEnglish ? 'This invitation is for one person only.' : 'Bu davetiye tek kişiliktir.'}
              </div>
            )}
          </motion.div>
        )}

        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">{isEnglish ? 'Leave a message for us' : 'Bize dileklerinizi yazın'}</label>
          <textarea
            {...register('comentarios')}
            rows={3}
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30"
            placeholder={isEnglish ? 'A beautiful message for us...' : 'Bizim için güzel bir mesaj...'}
          />
        </div>

        {submitStatus === 'error' && (
          <div className="p-3 bg-red-50 text-red-600 rounded flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-primary text-white font-sans font-medium uppercase tracking-wider rounded shadow-md hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" /> {isEnglish ? 'Sending...' : 'Gönderiliyor...'}</>
          ) : (
            isEnglish ? 'SEND RESPONSE' : '✉️ Yanıtı Gönder'
          )}
        </button>

      </form>
    </Section>
  );
};
