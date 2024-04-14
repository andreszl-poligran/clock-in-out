const Alert = ({alert}: {alert: AlertType}) => {
  return (
    <div className={`${alert.error ? 'text-[#9E3434]' : 'text-[#000000] dark:text-[#9A9A9A]'} text-center rounded-xl font-semibold text-[16px] my-3`}>
			{alert.msg}
    </div>
  )
}

export default Alert
