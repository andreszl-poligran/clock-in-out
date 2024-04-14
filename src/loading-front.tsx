import { useTranslation } from 'react-i18next'
import { ClipLoader } from 'react-spinners'

export default () => {
    const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[90vh]">
			<h1 className='text-xl mb-4'>{t('sidebar.loading')}</h1>
			<ClipLoader color='#23a763' loading={true} size={50} />
    </div>
  )
}
