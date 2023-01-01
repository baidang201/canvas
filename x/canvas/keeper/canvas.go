package keeper

import (
	"canvas/x/canvas/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetCanvas set canvas in the store
func (k Keeper) SetCanvas(ctx sdk.Context, canvas types.Canvas) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CanvasKey))
	b := k.cdc.MustMarshal(&canvas)
	store.Set([]byte{0}, b)
}

// GetCanvas returns canvas
func (k Keeper) GetCanvas(ctx sdk.Context) (val types.Canvas, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CanvasKey))

	b := store.Get([]byte{0})
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveCanvas removes canvas from the store
func (k Keeper) RemoveCanvas(ctx sdk.Context) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CanvasKey))
	store.Delete([]byte{0})
}
