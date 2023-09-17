import React from 'react'

export default function Footer() {
    var date = new Date().toJSON().slice(0, 10);
  return (
    <div className="site-footer__bottom">
        <div className="row">
            <div className="col-xl-12">
                <div className="site-footer__bottom-inner">
                    <p className="site-footer__bottom-text">© All Copyright {date} by <a href="/">www.referkar.com</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
