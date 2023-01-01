package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateCanvas = "create_canvas"

var _ sdk.Msg = &MsgCreateCanvas{}

func NewMsgCreateCanvas(creator string, id string, width uint64, height uint64, refundDuration string, allowDenomPrefix string, priceForPoint uint64) *MsgCreateCanvas {
	return &MsgCreateCanvas{
		Creator:          creator,
		Id:               id,
		Width:            width,
		Height:           height,
		RefundDuration:   refundDuration,
		AllowDenomPrefix: allowDenomPrefix,
		PriceForPoint:    priceForPoint,
	}
}

func (msg *MsgCreateCanvas) Route() string {
	return RouterKey
}

func (msg *MsgCreateCanvas) Type() string {
	return TypeMsgCreateCanvas
}

func (msg *MsgCreateCanvas) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateCanvas) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateCanvas) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
