import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Section } from './Section';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Google Spreadsheet Web App URL'niz - KESİNLİKLE DOKUNULMADI
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyodfi6tYdNPlAj6cwByJXWPDmdJ0wPZgR0-P5ZzQ7YTVDneCVxN5c9SAkYW2TxJZcOGA/exec';

export const RSVPForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();
  
  const asistiraValue = watch('asistira');
  const hasPlusOne = watch('has_plus_one');

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // YENİ: SADELEŞTİRİLMİŞ, TERTEMİZ BAŞARI EKRANI
  if (submitStatus === 'success') {
    return (
      <Section id="rsvp" className="text-center py-24">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-primary/10 max-w-sm mx-auto flex flex-col items-center"
        >
          <CheckCircle className="w-20 h-20 text-[#4C6444] mb-6 opacity-90" />
          <h2 className="font-script text-5xl text-text tracking-wide">Teşekkürler!</h2>
        </motion.div>
      </Section>
    );
  }

  return (
    <Section id="rsvp" className="max-w-2xl" withPattern>
      <div className="text-center mb-10">
        <h2 className="font-script text-4xl text-text mb-2">Katılım Durumu</h2>
        <p className="font-sans text-text/60 uppercase tracking-widest text-xs">
          8 Ağustos 2026 tarihine kadar geri dönüş yapmanızı rica ederiz, teşekkürler!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-10 rounded-lg shadow-lg border border-primary/10">
        
        {/* Ad Soyad */}
        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">Ad Soyad *</label>
          <input
            {...register('nombre_completo', { required: 'İsim alanı zorunludur' })}
            type="text"
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30"
            placeholder="Adınız ve soyadınız"
          />
          {errors.nombre_completo && <span className="text-red-500 text-xs font-sans">{(errors.nombre_completo as any).message}</span>}
        </div>

        {/* E-posta */}
        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">E-posta</label>
          <input
            {...register('email', { 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Geçersiz e-posta adresi"
              }
            })}
            type="email"
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30"
            placeholder="Detayları gönderebilmemiz için"
          />
          {errors.email && <span className="text-red-500 text-xs font-sans">{(errors.email as any).message}</span>}
        </div>

        {/* Katılım Durumu */}
        <div className="space-y-2">
          <label className="block font-serif text-lg text-text">Düğünümüze katılabilecek misiniz? *</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input
                {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })}
                type="radio"
                value="Evet, katılıyorum"
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <span className="font-sans text-text">Evet, katılıyorum</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input
                {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })}
                type="radio"
                value="Hayır, katılamıyorum"
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <span className="font-sans text-text">Hayır, katılamıyorum</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input
                {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })}
                type="radio"
                value="Henüz bilmiyorum"
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <span className="font-sans text-text">Henüz bilmiyorum</span>
            </label>
          </div>
          {errors.asistira && <span className="text-red-500 text-xs font-sans">{(errors.asistira as any).message}</span>}
        </div>

        {/* Şartlı Alanlar: Eğer "Evet" veya "Bilmiyorum" denirse +1 sorusu çıksın */}
        {(asistiraValue === 'Evet, katılıyorum' || asistiraValue === 'Henüz bilmiyorum') && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-6 pt-4 border-t border-primary/10"
          >
            {/* +1 Kişi Var mı Seçeneği */}
            <div className="space-y-2">
              <label className="block font-serif text-lg text-text">Yanınızda artı bir misafirimiz olacak mı?</label>
              <div className="flex space-x-6 p-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input {...register('has_plus_one')} type="radio" value="yes" className="text-primary focus:ring-primary" />
                  <span className="font-sans text-text">Evet</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input {...register('has_plus_one')} type="radio" value="no" className="text-primary focus:ring-primary" />
                  <span className="font-sans text-text">Hayır</span>
                </label>
              </div>
            </div>

            {/* Eğer +1 seçeneğine "Evet" derlerse çıkacak Ekstra Ad Soyad alanı */}
            {hasPlusOne === 'yes' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="space-y-1 bg-secondary/10 p-4 rounded border border-primary/5"
              >
                <label className="block font-serif text-base text-text">Gelecek Diğer Kişinin Adı Soyadı *</label>
                <input
                  {...register('plus_one_name', { required: 'Lütfen eşinizin/misafirinizin adını belirtiniz' })}
                  type="text"
                  className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-white"
                  placeholder="Refakatçinizin adı ve soyadı"
                />
                {errors.plus_one_name && <span className="text-red-500 text-xs font-sans">{(errors.plus_one_name as any).message}</span>}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Dilek ve Not Kutusu */}
        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">Bize dileklerinizi yazın</label>
          <textarea
            {...register('comentarios')}
            rows={3}
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30"
            placeholder="Bizim için güzel bir mesaj..."
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
            <>
              <Loader2 className="animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            '✉️ Yanıtı Gönder'
          )}
        </button>

      </form>
    </Section>
  );
};
