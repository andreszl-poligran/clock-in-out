import { useTranslation } from 'react-i18next'

export default () => {
    const { t } = useTranslation()
    const handleReload = () => {
        if(window) {
            window.location.reload()
        }
    }

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[90vh]">
        <h1>{t('sidebar.error')}</h1>
        <button
            type='button'
            className='bg-[#23a763] hover:bg-[#23a763bb] text-white rounded-lg px-4 py-2 mt-2'
            onClick={handleReload}
        >Try Again</button>
    </div>
  )
}