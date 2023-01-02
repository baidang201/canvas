package keeper

import (
	"canvas/x/canvas/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetStoredColors set a specific storedColors in the store from its index
func (k Keeper) SetStoredColors(ctx sdk.Context, storedColors types.StoredColors) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredColorsKeyPrefix))
	b := k.cdc.MustMarshal(&storedColors)
	store.Set(types.StoredColorsKey(
		storedColors.Index,
	), b)
}

// GetStoredColors returns a storedColors from its index
func (k Keeper) GetStoredColors(
	ctx sdk.Context,
	index string,

) (val types.StoredColors, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredColorsKeyPrefix))

	b := store.Get(types.StoredColorsKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveStoredColors removes a storedColors from the store
func (k Keeper) RemoveStoredColors(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredColorsKeyPrefix))
	store.Delete(types.StoredColorsKey(
		index,
	))
}

// GetAllStoredColors returns all storedColors
func (k Keeper) GetAllStoredColors(ctx sdk.Context) (list []types.StoredColors) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StoredColorsKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.StoredColors
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
