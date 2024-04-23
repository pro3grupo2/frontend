const AlertContainer = ({ alerts }) => {
    return (
        <div className="position-fixed top-0 end-0 mt-3 me-3 z-3">
            {alerts}
        </div>
    )
}

const Alert = (message, type) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    )
}

const create_alert = (setAlerts, message, type, use_timeout = true, timeout = 3000) => {
    const alert = Alert(message, type)
    setAlerts(old => [...old, alert])

    if (use_timeout) setTimeout(() => {
        setAlerts(old => old.filter((a) => a !== alert))
    }, timeout)
}

module.exports = {
    AlertContainer, create_alert
}
