import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../supabase';
import { Section } from './Section';
import type { RsvpFormData } from '../types';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const RSVPForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RsvpFormData>();
  
  const asistiraValue = watch('asistira');

  const onSubmit = async (data: RsvpFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('rsvp_responses')
        .insert([data]);

      if (error) throw error;

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
      setErrorMessage((error as Error).message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Section id="rsvp" className="text-center py-20">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg border border-primary/20 max-w-md mx-auto"
        >
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="font-serif text-3xl text-text mb-4">Teşekkürler!</h2>
          <p className="font-sans text-text mb-6">
            Katılım durumunuz başarıyla başarıyla kaydedildi.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary underline font-sans text-sm hover:text-primary/80"
          >
            Başka bir yanıt gönder
          </button>
        </motion.div>
      </Section>
    );
  }

  return (
    <Section id="rsvp" className="max-w-2xl" withPattern>
      <div className="text-center mb-10">
        <h2 className="font-script text-4xl text-text mb-2">Katılım Durumu</h2>
        <p className="font-sans text-text/60 uppercase tracking-widest text-xs">22 Ağustos 2026 tarihine kadar geri dönüş yapmanızı rica ederiz, teşekkürler!</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-10 rounded-lg shadow-lg border border-primary/10">
        
        {/* Nombre */}
        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">Ad Soyad *</label>
          <input
            {...register('nombre_completo', { required: 'İsim alanı zorunludur' })}
            type="text"
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30"
            placeholder="Adınız ve soyadınız"
          />
          {errors.nombre_completo && <span className="text-red-500 text-xs font-sans">{errors.nombre_completo.message}</span>}
        </div>

        {/* Email */}
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
          {errors.email && <span className="text-red-500 text-xs font-sans">{errors.email.message}</span>}
        </div>

        {/* Asistencia */}
        <div className="space-y-2">
          <label className="block font-serif text-lg text-text">Düğünümüze katılabilecek misiniz? *</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input
                {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })}
                type="radio"
                value="si"
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <span className="font-sans text-text">Evet, katılıyorum</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input
                {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })}
                type="radio"
                value="no"
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <span className="font-sans text-text">Hayır, katılamıyorum</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input
                {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })}
                type="radio"
                value="no_se"
                className="text-primary focus:ring-primary h-4 w-4"
              />
              <span className="font-sans text-text">Henüz bilmiyorum</span>
            </label>
          </div>
          {errors.asistira && <span className="text-red-500 text-xs font-sans">{errors.asistira.message}</span>}
        </div>

        {/* Conditional fields if attending or maybe */}
        {(asistiraValue === 'si' || asistiraValue === 'no_se') && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-6 pt-4 border-t border-primary/10"
          >
            {/* Ceremonia Checkbox */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('ceremonia')}
                type="checkbox"
                className="rounded text-primary focus:ring-primary h-5 w-5"
              />
              <span className="font-serif text-lg text-text">Nikah seremonisinde de yanımızda olacak mısınız?</span>
            </label>

            {/* Alergias */}
            <div className="space-y-2">
              <label className="block font-serif text-lg text-text mb-2">Alerji veya özel beslenme tercihi</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input {...register('vegetariano')} type="checkbox" className="rounded text-primary focus:ring-primary" />
                  <span className="font-sans text-sm text-text">Vejetaryen</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input {...register('sin_gluten')} type="checkbox" className="rounded text-primary focus:ring-primary" />
                  <span className="font-sans text-sm text-text">Glutensiz</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input {...register('vegano')} type="checkbox" className="rounded text-primary focus:ring-primary" />
                  <span className="font-sans text-sm text-text">Vegan</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input {...register('sin_lactosa')} type="checkbox" className="rounded text-primary focus:ring-primary" />
                  <span className="font-sans text-sm text-text">Laktozsuz</span>
                </label>
              </div>
              
              <div className="mt-3">
                <label className="block font-sans text-sm text-text mb-1">Diğer alerjiler / hassasiyetler:</label>
                <input
                  {...register('otras_alergias')}
                  type="text"
                  className="w-full px-3 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30 text-sm"
                  placeholder="Belirtiniz..."
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Comentarios */}
        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">Eklemek istediğiniz notlar</label>
          <textarea
            {...register('comentarios')}
            rows={3}
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30"
            placeholder="Bizim için bir mesajınız var mı?"
          />
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="p-3 bg-red-50 text-red-600 rounded flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
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
