import React from 'react';
import PropTypes from 'prop-types';
import createStellarIdenticon from 'stellar-identicon-js';
import Driver from '../../../../../lib/Driver';
import AssetCardInRow from '../../../../Common/AssetCard/AssetCardInRow/AssetCardInRow';

export default function SendReview(props) {
    const {
        state,
        accountId,
        memoType,
        memoContent,
        assetToSend,
        amountToSend,
        clickBackToSend,
        federationAddress,
        submitSendTransaction,
    } = props.d.send;

    const identiconImg = createStellarIdenticon(accountId).toDataURL();
    const memoTitle = memoType.replace(/_/g, ' ').toLowerCase();
    const memoTitleText = memoTitle.charAt(0).toUpperCase() + memoTitle.slice(1);

    return (
        <div className="Send_block">
            <div className="Send_title">
                <h1>Review payment</h1>
                <div className="field_description">
                Transactions on the Stellar network are irreversible.{' '}
                    Please make sure all the transaction details are correct.
                </div>
            </div>

            <div className="Send_details">
                <div className="content_main">
                    <div className="content_block">
                        <div className="content_title">Recipient</div>
                        <div className="content_text">
                            <img src={identiconImg} alt="identicon" className="identicon_resolved" />
                            <span className="publicKey_resolved">
                                {accountId}
                            </span>
                        </div>
                    </div>

                    {federationAddress !== '' ? (
                        <div className="content_block">
                            <div className="content_title">Recipient federation address</div>
                            <div className="content_text">
                                {federationAddress}
                            </div>
                        </div>
                    ) : null}

                    {memoType !== 'none' && memoContent !== '' ? (
                        <div className="content_block">
                            <div className="content_title">{memoTitleText}</div>
                            <div className="content_text">{memoContent}</div>
                        </div>
                    ) : null}

                    <div className="review_data">
                        <div className="content_block">
                            <div className="content_title">Amount {assetToSend.asset.code}</div>
                            <div className="content_text">{amountToSend}</div>
                        </div>
                        <div className="content_block">
                            <div className="content_title">Asset</div>
                            <div className="content_text">
                                <AssetCardInRow
                                    code={assetToSend.asset.code}
                                    issuer={assetToSend.asset.issuer}
                                    d={props.d} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Send_button_block">
                <button className="s-btn_cancel" onClick={() => clickBackToSend()}>
                    Back
                </button>
                <button className="s-button" onClick={() => submitSendTransaction()}>
                    {state === 'pending' ? <div className="nk-spinner" /> : 'Submit transaction'}
                </button>
            </div>
        </div>
    );
}

SendReview.propTypes = {
    d: PropTypes.instanceOf(Driver).isRequired,
};
