import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Section } from './Section';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Katılımcı bilgisini çektiğimiz ve yanıtı yolladığımız Google linkleri
const RSVP_SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbx-F1PKODUFCkf3MXPv_uvSeOgp1BCe38m1tXzhp-Sg38WjsH9UhZqrkczaBoXES-tPaQ/exec';
const GUEST_API_URL = 'https://script.google.com/macros/s/AKfycbwRHNQ9rH-Aa48lp-jBMbejWDzhpxzb00pD1fZPoRwmHx6Bh22l62N541j5_jk49zeY6g/exec';

interface RSVPFormProps {
  slug?: string;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ slug }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Kontenjan durumu: Varsayılan null. Eğer API'den gelirse güncellenir.
  const [guestQuota, setGuestQuota] = useState<number | null>(null);

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<any>();
  
  const asistiraValue = watch('asistira');
  const hasPlusOne = watch('has_plus_one');

  // Sayfa yüklendiğinde, eğer URL'de slug varsa Google Sheets'ten kontenjanını (C sütunu) öğren
  useEffect(() => {
    if (slug) {
      fetch(`${GUEST_API_URL}?slug=${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            // İsim bulunduğunda formun isim alanını otomatik doldur
            setValue('nombre_completo', data.isim);
            
            // Eğer Excel'den kontenjan (C sütunu) geliyorsa al, gelmiyorsa varsayılan 1 yap
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

    // Eğer kontenjan 1 ise (misafir hakkı yoksa), arka planda gizlice misafir bilgilerini boş gönderelim ki eski Excel çökmesin
    const finalData = {
      ...data,
      has_plus_one: (guestQuota === 1) ? 'no' : data.has_plus_one,
      plus_one_name: (guestQuota === 1) ? '' : data.plus_one_name,
    };

    try {
      await fetch(RSVP_SUBMIT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
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
        <p className="font-sans text-text/60 tracking-widest text-[11px] md:text-xs">
          8 AĞUSTOS 2026 TARİHİNE KADAR GERİ DÖNÜŞ YAPMANIZI RİCA EDERİZ, TEŞEKKÜRLER!
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

        {/* Cep Telefonu */}
        <div className="space-y-1">
          <label className="block font-serif text-lg text-text">Cep Telefonu *</label>
          <input
            {...register('telefon', { 
              required: 'Telefon numarası zorunludur',
              pattern: {
                value: /^\+?[0-9\s-]{10,}$/,
                message: "Lütfen geçerli bir telefon numarası giriniz (Ör: +90...)"
              }
            })}
            type="tel"
            defaultValue="+90"
            className="w-full px-4 py-2 border border-primary/20 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-secondary/30 font-sans"
            placeholder="+90 5XX XXX XX XX"
          />
          {errors.telefon && <span className="text-red-500 text-xs font-sans">{(errors.telefon as any).message}</span>}
        </div>

        {/* Katılım Durumu */}
        <div className="space-y-2">
          <label className="block font-serif text-lg text-text">Düğünümüze katılabilecek misiniz? *</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })} type="radio" value="Evet, katılıyorum" className="text-primary focus:ring-primary h-4 w-4" />
              <span className="font-sans text-text">Evet, katılıyorum</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })} type="radio" value="Hayır, katılamıyorum" className="text-primary focus:ring-primary h-4 w-4" />
              <span className="font-sans text-text">Hayır, katılamıyorum</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border border-transparent hover:bg-secondary/30 rounded transition-colors">
              <input {...register('asistira', { required: 'Lütfen bir seçenek belirleyin' })} type="radio" value="Henüz bilmiyorum" className="text-primary focus:ring-primary h-4 w-4" />
              <span className="font-sans text-text">Henüz bilmiyorum</span>
            </label>
          </div>
          {errors.asistira && <span className="text-red-500 text-xs font-sans">{(errors.asistira as any).message}</span>}
        </div>

        {/* Şartlı Alanlar (+1 Mantığı) */}
        {(asistiraValue === 'Evet, katılıyorum' || asistiraValue === 'Henüz bilmiyorum') && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-6 pt-4 border-t border-primary/10"
          >
            {/* Eğer kişi slug ile gelmediyse VEYA kontenjanı 2 ve üzeri ise bu +1 sorusunu göster */}
            {(guestQuota === null || guestQuota >= 2) && (
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

                {hasPlusOne === 'yes' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-1 bg-secondary/10 p-4 rounded border border-primary/5 mt-4"
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
              </div>
            )}
            
            {/* Eğer kişinin kontenjanı kesin 1 ise ve bu durumu ona da söylemek istersen (isteğe bağlı) */}
            {guestQuota === 1 && (
              <div className="text-sm text-text/60 italic px-2">
                * Bu davetiye tek kişiliktir.
              </div>
            )}

          </motion.div>
        )}

        {/* Dilek ve Not */}
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
            <><Loader2 className="animate-spin" /> Gönderiliyor...</>
          ) : (
            '✉️ Yanıtı Gönder'
          )}
        </button>

      </form>
    </Section>
  );
};
