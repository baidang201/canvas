package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgPaint = "paint"

var _ sdk.Msg = &MsgPaint{}

func NewMsgPaint(creator string, id string, x uint64, y uint64, amount uint64) *MsgPaint {
	return &MsgPaint{
		Creator: creator,
		Id:      id,
		X:       x,
		Y:       y,
		Amount:  amount,
	}
}

func (msg *MsgPaint) Route() string {
	return RouterKey
}

func (msg *MsgPaint) Type() string {
	return TypeMsgPaint
}

func (msg *MsgPaint) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgPaint) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgPaint) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
